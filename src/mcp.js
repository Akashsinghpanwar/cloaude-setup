import { execSync } from 'child_process';
import { createSpinner, logSuccess, logWarning, logError, logInfo, isCommandAvailable } from './utils.js';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Auto-Detection — Check what's already installed before installing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function isMcpServerInstalled(serverId) {
  try {
    const output = execSync('claude mcp list', { encoding: 'utf-8', timeout: 15000, stdio: ['pipe', 'pipe', 'pipe'] });
    // Check if the server name appears in the installed MCP list
    return output.toLowerCase().includes(serverId.toLowerCase());
  } catch {
    return false; // Can't detect = assume not installed
  }
}

function isPluginInstalled(pluginId) {
  if (pluginId === 'caveman') {
    try {
      // Check if caveman hooks exist in claude config
      const output = execSync('claude plugin list', { encoding: 'utf-8', timeout: 15000, stdio: ['pipe', 'pipe', 'pipe'] });
      return output.toLowerCase().includes('caveman');
    } catch {
      return false;
    }
  }
  if (pluginId === 'graphify') {
    try {
      // Check if graphify is pip-installed
      execSync('pip show graphify', { stdio: 'ignore', timeout: 15000 });
      return true;
    } catch {
      try {
        execSync('pip3 show graphify', { stdio: 'ignore', timeout: 15000 });
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MCP Servers — These are EXISTING packages from the ecosystem
// We install them, NOT recreate them
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MCP_COMMANDS = {
  'sequential-thinking': {
    name: 'Sequential Thinking',
    cmd: 'claude mcp add sequential-thinking npx -y @modelcontextprotocol/server-sequential-thinking',
    desc: 'Complex reasoning & step-by-step problem solving',
  },
  memory: {
    name: 'Memory Server',
    cmd: 'claude mcp add memory npx -y @modelcontextprotocol/server-memory',
    desc: 'Persistent cross-session memory',
  },
  context7: {
    name: 'Context7',
    cmd: 'claude mcp add context7 npx -y @upstash/context7-mcp@latest',
    desc: 'Live, version-specific documentation',
  },
  playwright: {
    name: 'Playwright',
    cmd: 'claude mcp add playwright npx -y @playwright/mcp@latest',
    desc: 'Browser automation & E2E testing',
  },
  github: {
    name: 'GitHub MCP',
    cmd: 'claude mcp add github npx -y @modelcontextprotocol/server-github',
    desc: 'Repository management & PR intelligence',
  },
  filesystem: {
    name: 'Filesystem',
    cmd: 'claude mcp add filesystem npx -y @modelcontextprotocol/server-filesystem .',
    desc: 'Enhanced file operations',
  },
  stitch: {
    name: 'Stitch MCP',
    cmd: 'npx @_davideast/stitch-mcp init',
    desc: 'AI-powered frontend design generation',
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Plugins — Existing tools: Caveman (token saver) & Graphify (codebase graph)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PLUGIN_COMMANDS = {
  caveman: {
    name: 'Caveman',
    desc: '~75% token savings — compressed communication',
    installSteps: [
      { cmd: 'claude plugin install caveman', label: 'Plugin install' },
    ],
    fallbackCmd: 'bash <(curl -s https://raw.githubusercontent.com/JuliusBrussee/caveman/main/hooks/install.sh)',
    verifyHint: 'In Claude Code session, type: caveman lite',
  },
  graphify: {
    name: 'Graphify',
    desc: '71x token reduction — codebase knowledge graph',
    installSteps: [
      { cmd: 'pip install graphify', label: 'pip install' },
      { cmd: 'graphify install', label: 'project init' },
    ],
    fallbackCmd: 'pip install graphify && graphify install',
    verifyHint: 'In Claude Code session, type: /graphify',
  },
};

export async function setupMcpServers(selectedServers) {
  const installed = [];
  const skipped = [];
  const failed = [];

  const claudeAvailable = isCommandAvailable('claude');

  if (!claudeAvailable) {
    logWarning('Claude CLI not found. MCP commands saved to setup-mcp.sh for manual execution.');
    const commands = selectedServers
      .map((s) => MCP_COMMANDS[s]?.cmd)
      .filter(Boolean);
    return { installed: [], skipped: [], failed: [], commands };
  }

  // First pass: detect what's already installed
  const detectionSpinner = createSpinner('Detecting already-installed MCP servers...');
  detectionSpinner.start();
  const alreadyInstalled = new Set();
  for (const serverId of selectedServers) {
    if (isMcpServerInstalled(serverId)) {
      alreadyInstalled.add(serverId);
    }
  }
  detectionSpinner.succeed(`Scanned ${selectedServers.length} servers — ${alreadyInstalled.size} already installed`);

  for (const serverId of selectedServers) {
    const server = MCP_COMMANDS[serverId];
    if (!server) continue;

    // Skip if already installed
    if (alreadyInstalled.has(serverId)) {
      logSuccess(`${server.name} — Already installed ✓ (skipped)`);
      skipped.push(serverId);
      continue;
    }

    const spinner = createSpinner(`Installing ${server.name}...`);
    spinner.start();

    try {
      execSync(server.cmd, { stdio: 'ignore', timeout: 60000 });
      spinner.succeed(`${server.name} — ${server.desc}`);
      installed.push(serverId);
    } catch {
      spinner.fail(`${server.name} — Failed (run manually: ${server.cmd})`);
      failed.push({ id: serverId, cmd: server.cmd });
    }
  }

  return { installed, skipped, failed, commands: null };
}

export async function setupPlugins(selectedPlugins) {
  const installed = [];
  const skipped = [];
  const failed = [];

  for (const pluginId of selectedPlugins) {
    const plugin = PLUGIN_COMMANDS[pluginId];
    if (!plugin) continue;

    // Auto-detect: skip if already installed
    if (isPluginInstalled(pluginId)) {
      logSuccess(`${plugin.name} — Already installed ✓ (skipped)`);
      skipped.push(pluginId);
      continue;
    }

    const spinner = createSpinner(`Installing ${plugin.name}...`);
    spinner.start();

    let success = false;
    for (const step of plugin.installSteps) {
      try {
        execSync(step.cmd, { stdio: 'ignore', timeout: 120000 });
        success = true;
      } catch {
        success = false;
        break;
      }
    }

    if (success) {
      spinner.succeed(`${plugin.name} — ${plugin.desc}`);
      logInfo(`  Verify: ${plugin.verifyHint}`);
      installed.push(pluginId);
    } else {
      spinner.fail(`${plugin.name} — Auto-install failed`);
      logInfo(`  Manual install: ${plugin.fallbackCmd}`);
      failed.push({ id: pluginId, cmd: plugin.fallbackCmd });
    }
  }

  return { installed, skipped, failed };
}

export function getMcpSetupScript(selectedServers, selectedPlugins = []) {
  const lines = ['#!/bin/bash', '# Vibe Elite — Complete Setup Script', '# Run this script to install everything\n'];

  lines.push('# ━━━ MCP Servers ━━━');
  for (const serverId of selectedServers) {
    const server = MCP_COMMANDS[serverId];
    if (server) {
      lines.push(`# ${server.name} — ${server.desc}`);
      lines.push(server.cmd);
      lines.push('');
    }
  }

  if (selectedPlugins.length > 0) {
    lines.push('# ━━━ Plugins (Existing Tools) ━━━');
    for (const pluginId of selectedPlugins) {
      const plugin = PLUGIN_COMMANDS[pluginId];
      if (plugin) {
        lines.push(`# ${plugin.name} — ${plugin.desc}`);
        lines.push(plugin.fallbackCmd);
        lines.push('');
      }
    }
  }

  lines.push('# ━━━ Verify ━━━');
  lines.push('claude mcp list');
  return lines.join('\n');
}
