import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';

const eliteGradient = gradient(['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff']);
const successGradient = gradient(['#00b894', '#00cec9', '#0984e3']);

export function showBanner() {
  const banner = figlet.textSync('VIBE ELITE', {
    font: 'ANSI Shadow',
    horizontalLayout: 'fitted',
  });
  console.log('\n' + eliteGradient(banner));
  console.log(
    boxen(
      chalk.white.bold('  One Command. Elite Claude Code Setup.  \n') +
        chalk.gray('  Production-Grade AI Development Environment  '),
      {
        padding: 1,
        margin: { top: 0, bottom: 1, left: 2, right: 2 },
        borderStyle: 'double',
        borderColor: 'cyan',
      }
    )
  );
}

export function createSpinner(text) {
  return ora({
    text,
    spinner: 'dots12',
    color: 'cyan',
  });
}

export function logStep(step, total, message) {
  console.log(
    chalk.cyan(`\n  [${step}/${total}]`) + chalk.white.bold(` ${message}`)
  );
}

export function logSuccess(message) {
  console.log(chalk.green('  ✓ ') + chalk.white(message));
}

export function logWarning(message) {
  console.log(chalk.yellow('  ⚠ ') + chalk.white(message));
}

export function logError(message) {
  console.log(chalk.red('  ✗ ') + chalk.white(message));
}

export function logInfo(message) {
  console.log(chalk.blue('  ℹ ') + chalk.gray(message));
}

export function showCompletionBanner(config) {
  const level = config.level === 'elite' ? '🔥 ELITE' : '⚡ STANDARD';
  const msg =
    successGradient('\n  ━━━ Setup Complete! ━━━\n\n') +
    chalk.white(`  Level: ${level}\n`) +
    chalk.white(`  Project: ${config.projectName}\n`) +
    chalk.white(`  Stack: ${config.stack}\n`) +
    chalk.white(`  Skills Installed: ${config.skillCount}\n`) +
    chalk.white(`  MCP Servers: ${config.mcpCount}\n\n`) +
    chalk.cyan.bold('  Next Steps:\n') +
    chalk.white('  1. Open your project in Claude Code\n') +
    chalk.white('  2. Claude will auto-read CLAUDE.md\n') +
    chalk.white('  3. Start coding at ' + level + ' level!\n\n') +
    chalk.gray('  Token Optimization: Enabled (up to 75% savings)\n') +
    successGradient('  ━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log(
    boxen(msg, {
      padding: 1,
      margin: { top: 1, bottom: 1, left: 2, right: 2 },
      borderStyle: 'round',
      borderColor: 'green',
    })
  );
}

export function isCommandAvailable(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export function getProjectRoot() {
  return process.cwd();
}

export function ensureDir(dirPath) {
  fs.ensureDirSync(dirPath);
}

export function writeFile(filePath, content) {
  fs.ensureDirSync(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function fileExists(filePath) {
  return fs.existsSync(filePath);
}
