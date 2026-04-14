import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import { askSetupQuestions } from './prompts.js';
import { setupMcpServers, setupPlugins, getMcpSetupScript } from './mcp.js';
import { installSkills } from './skills.js';
import { generateClaudeMd, generateProgressMd, generateClaudeignore } from './templates.js';
import {
  showBanner,
  createSpinner,
  logStep,
  logSuccess,
  logWarning,
  logInfo,
  showCompletionBanner,
  getProjectRoot,
  writeFile,
  fileExists,
} from './utils.js';

const TOTAL_STEPS = 8;

export async function run() {
  // Step 0: Show Banner
  showBanner();

  // Step 1: Ask Questions
  logStep(1, TOTAL_STEPS, 'Configuration');
  const config = await askSetupQuestions();
  const projectRoot = getProjectRoot();

  // Step 2: Auto-detect existing project
  logStep(2, TOTAL_STEPS, 'Scanning Project');
  const detected = config.autoDetect ? autoDetectProject(projectRoot) : null;
  if (detected) {
    logSuccess(`Detected: ${detected.type} project`);
    if (detected.framework) logSuccess(`Framework: ${detected.framework}`);
    if (detected.language) logSuccess(`Language: ${detected.language}`);
    if (detected.packageManager) logSuccess(`Package Manager: ${detected.packageManager}`);
    if (detected.dependencies.length > 0) {
      logInfo(`Key deps: ${detected.dependencies.slice(0, 8).join(', ')}`);
    }
    // Merge detected info into config for smarter CLAUDE.md generation
    config._detected = detected;
  } else {
    logInfo('No existing project detected (fresh setup)');
  }

  console.log(chalk.gray(`\n  Project root: ${projectRoot}`));
  console.log(chalk.gray(`  Level: ${config.level === 'elite' ? 'ELITE' : 'STANDARD'}`));

  // Step 3: Install MCP Servers (EXISTING ecosystem packages)
  logStep(3, TOTAL_STEPS, 'Installing MCP Servers (existing packages)');
  const mcpResult = await setupMcpServers(config.mcpServers);

  if (mcpResult.commands) {
    const script = getMcpSetupScript(config.mcpServers, config.plugins);
    writeFile(path.join(projectRoot, 'setup-mcp.sh'), script);
    logWarning('Claude CLI not found — setup script saved to setup-mcp.sh');
  }

  if (mcpResult.skipped?.length > 0) {
    logInfo(`${mcpResult.skipped.length} server(s) already installed — skipped`);
  }
  if (mcpResult.failed?.length > 0) {
    logWarning(`${mcpResult.failed.length} server(s) failed. Run manually:`);
    mcpResult.failed.forEach((f) => logInfo(f.cmd));
  }

  // Step 4: Install Plugins (Caveman + Graphify — EXISTING tools)
  logStep(4, TOTAL_STEPS, 'Installing Plugins (Caveman, Graphify)');
  if (config.plugins && config.plugins.length > 0) {
    const pluginResult = await setupPlugins(config.plugins);
    if (pluginResult.skipped.length > 0) {
      logInfo(`${pluginResult.skipped.length} plugin(s) already installed — skipped`);
    }
    if (pluginResult.installed.length > 0) {
      logSuccess(`${pluginResult.installed.length} plugin(s) freshly installed`);
    }
    if (pluginResult.failed.length > 0) {
      logWarning(`${pluginResult.failed.length} plugin(s) need manual install:`);
      pluginResult.failed.forEach((f) => logInfo(`  ${f.cmd}`));
    }
  } else {
    logInfo('No plugins selected');
  }

  // Step 5: Install UNIQUE Skills (these don't exist anywhere else)
  logStep(5, TOTAL_STEPS, 'Installing Unique Skills');
  const installedSkills = await installSkills(config.features, projectRoot);
  logSuccess(`${installedSkills.length} skills installed to .claude/skills/`);

  // Step 6: Generate CLAUDE.md (Smart — uses auto-detect data)
  logStep(6, TOTAL_STEPS, 'Generating Smart CLAUDE.md');
  const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');

  if (fileExists(claudeMdPath)) {
    logWarning('CLAUDE.md already exists — saving as CLAUDE.vibe-elite.md');
    writeFile(path.join(projectRoot, 'CLAUDE.vibe-elite.md'), generateClaudeMd(config));
  } else {
    writeFile(claudeMdPath, generateClaudeMd(config));
  }
  logSuccess('CLAUDE.md configured with project rules + detected stack info');

  // Step 7: Generate Supporting Files
  logStep(7, TOTAL_STEPS, 'Generating Supporting Files');

  if (config.progressTracking) {
    const progressPath = path.join(projectRoot, 'progress.md');
    if (!fileExists(progressPath)) {
      writeFile(progressPath, generateProgressMd(config));
      logSuccess('progress.md — session continuity tracker');
    } else {
      logWarning('progress.md already exists — skipping');
    }
  }

  const claudeignorePath = path.join(projectRoot, '.claudeignore');
  if (!fileExists(claudeignorePath)) {
    writeFile(claudeignorePath, generateClaudeignore());
    logSuccess('.claudeignore — token-saving file filter');
  }

  const envExamplePath = path.join(projectRoot, '.env.example');
  if (!fileExists(envExamplePath)) {
    writeFile(envExamplePath, generateEnvExample(config));
    logSuccess('.env.example — environment template');
  }

  // Step 8: Summary
  logStep(8, TOTAL_STEPS, 'Setup Complete!');

  showCompletionBanner({
    level: config.level,
    projectName: config.projectName,
    stack: config.stack,
    skillCount: installedSkills.length,
    mcpCount: mcpResult.installed?.length || config.mcpServers.length,
  });

  printQuickReference(config);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Auto-detect existing project (reads package.json, etc.)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function autoDetectProject(projectRoot) {
  const result = {
    type: null,
    framework: null,
    language: null,
    packageManager: null,
    dependencies: [],
    devDependencies: [],
    hasTests: false,
    hasDocker: false,
    hasCI: false,
  };

  // Check package.json (Node.js ecosystem)
  const pkgPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      const depNames = Object.keys(allDeps);
      result.dependencies = Object.keys(pkg.dependencies || {});
      result.devDependencies = Object.keys(pkg.devDependencies || {});

      // Detect framework
      if (depNames.includes('next')) result.framework = 'Next.js';
      else if (depNames.includes('react')) result.framework = 'React';
      else if (depNames.includes('vue')) result.framework = 'Vue';
      else if (depNames.includes('svelte') || depNames.includes('@sveltejs/kit')) result.framework = 'SvelteKit';
      else if (depNames.includes('express')) result.framework = 'Express';
      else if (depNames.includes('fastify')) result.framework = 'Fastify';
      else if (depNames.includes('hono')) result.framework = 'Hono';

      // Detect language
      result.language = depNames.includes('typescript') ? 'TypeScript' : 'JavaScript';

      // Detect type
      if (result.framework && ['Next.js', 'React', 'Vue', 'SvelteKit'].includes(result.framework)) {
        result.type = depNames.some((d) => ['express', 'fastify', 'prisma', '@prisma/client', 'drizzle-orm'].includes(d))
          ? 'Full-Stack' : 'Frontend';
      } else {
        result.type = 'Backend';
      }

      result.hasTests = depNames.some((d) => ['jest', 'vitest', 'mocha', '@testing-library/react', 'playwright'].includes(d));
    } catch { /* ignore parse errors */ }
  }

  // Check requirements.txt / pyproject.toml (Python)
  const reqPath = path.join(projectRoot, 'requirements.txt');
  const pyprojectPath = path.join(projectRoot, 'pyproject.toml');
  if (fs.existsSync(reqPath) || fs.existsSync(pyprojectPath)) {
    result.language = result.language || 'Python';
    result.type = result.type || 'Backend';
    if (fs.existsSync(reqPath)) {
      try {
        const reqs = fs.readFileSync(reqPath, 'utf-8');
        if (reqs.includes('fastapi')) result.framework = 'FastAPI';
        else if (reqs.includes('django')) result.framework = 'Django';
        else if (reqs.includes('flask')) result.framework = 'Flask';
      } catch { /* ignore */ }
    }
  }

  // Check go.mod (Go)
  if (fs.existsSync(path.join(projectRoot, 'go.mod'))) {
    result.language = 'Go';
    result.type = result.type || 'Backend';
  }

  // Check Cargo.toml (Rust)
  if (fs.existsSync(path.join(projectRoot, 'Cargo.toml'))) {
    result.language = 'Rust';
    result.type = result.type || 'CLI/Library';
  }

  // Package manager detection
  if (fs.existsSync(path.join(projectRoot, 'pnpm-lock.yaml'))) result.packageManager = 'pnpm';
  else if (fs.existsSync(path.join(projectRoot, 'yarn.lock'))) result.packageManager = 'yarn';
  else if (fs.existsSync(path.join(projectRoot, 'bun.lockb'))) result.packageManager = 'bun';
  else if (fs.existsSync(path.join(projectRoot, 'package-lock.json'))) result.packageManager = 'npm';

  // Docker / CI detection
  result.hasDocker = fs.existsSync(path.join(projectRoot, 'Dockerfile')) || fs.existsSync(path.join(projectRoot, 'docker-compose.yml'));
  result.hasCI = fs.existsSync(path.join(projectRoot, '.github', 'workflows'));

  return result.type ? result : null;
}

function generateEnvExample(config) {
  let env = `# ${config.projectName} — Environment Variables
# Copy this to .env and fill in values
# NEVER commit .env to git!

NODE_ENV=development
PORT=3000

# Database
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
# JWT_SECRET=your-secret-here
# JWT_EXPIRES_IN=15m
# REFRESH_TOKEN_EXPIRES_IN=7d

# External Services
# GITHUB_PERSONAL_ACCESS_TOKEN=
`;

  if (config.mcpServers.includes('stitch')) {
    env += '\n# Stitch MCP\n# STITCH_API_KEY=\n';
  }

  return env;
}

function printQuickReference(config) {
  console.log(chalk.cyan.bold('\n  Quick Reference:'));
  console.log(chalk.white('  ─────────────────────────────────────────────'));
  console.log(chalk.gray('  Existing Tools (auto-installed):'));
  console.log(chalk.white('    caveman lite        ') + chalk.gray('Start token savings'));
  console.log(chalk.white('    /graphify           ') + chalk.gray('Generate codebase graph'));
  console.log(chalk.white('    /mcp                ') + chalk.gray('Verify MCP servers'));

  console.log(chalk.gray('\n  Unique Vibe Elite Skills:'));

  const commands = [
    ['Audit code quality', '"Audit this code"'],
    ['Security scan', '"Security audit"'],
    ['Debug an issue', '"Debug this bug"'],
    ['Architecture review', '"Review architecture"'],
  ];

  if (config.level === 'elite') {
    commands.push(
      ['Token budget plan', '"Plan token budget for this task"'],
      ['Track tech debt', '"Analyze tech debt"'],
      ['Migration plan', '"Migrate from X to Y"'],
      ['Estimate effort', '"Estimate effort for this feature"'],
      ['Ship checklist', '"Run ship checklist"'],
    );
  }

  commands.forEach(([action, cmd]) => {
    console.log(chalk.white(`    ${action.padEnd(22)}`) + chalk.gray(cmd));
  });

  console.log(chalk.white('  ─────────────────────────────────────────────'));
  console.log(chalk.gray('\n  Happy coding! Build something amazing.\n'));
}
