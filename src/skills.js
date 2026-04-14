import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { logSuccess } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Core skills = guide-referenced (we keep these as smart orchestration layers)
// Elite skills = UNIQUE to vibe-elite (don't exist anywhere else)
const SKILL_MAP = {
  // Core (enhanced versions that ORCHESTRATE existing tools)
  'code-review': 'vibe-code-auditor.md',
  security: 'security-auditor.md',
  tdd: 'tdd-workflow.md',
  debugging: 'debugger-pro.md',
  architecture: 'architect-review.md',
  // Elite UNIQUE skills (never existed before)
  'token-budget': 'token-budget-planner.md',
  'tech-debt': 'tech-debt-tracker.md',
  migration: 'migration-assistant.md',
  estimator: 'effort-estimator.md',
  'prompt-eng': 'prompt-engineering.md',
  'dep-intel': 'dependency-intelligence.md',
  'session-handoff': 'session-handoff.md',
  'error-recovery': 'error-recovery-playbook.md',
  'stack-patterns': 'stack-specific-patterns.md',
  'ship-checklist': 'ship-checklist.md',
};

export async function installSkills(features, targetDir) {
  const skillsSourceDir = path.join(__dirname, '..', 'skills');
  const skillsTargetDir = path.join(targetDir, '.claude', 'skills');

  fs.ensureDirSync(skillsTargetDir);

  const installed = [];

  for (const feature of features) {
    const skillFile = SKILL_MAP[feature];
    if (!skillFile) continue;

    const sourcePath = path.join(skillsSourceDir, skillFile);
    const targetPath = path.join(skillsTargetDir, skillFile);

    if (fs.existsSync(sourcePath)) {
      fs.copySync(sourcePath, targetPath);
      logSuccess(`Skill: ${skillFile.replace('.md', '')}`);
      installed.push(skillFile);
    }
  }

  // Always install the master orchestrator skill
  const masterSource = path.join(skillsSourceDir, 'master-orchestrator.md');
  const masterTarget = path.join(skillsTargetDir, 'master-orchestrator.md');
  if (fs.existsSync(masterSource)) {
    fs.copySync(masterSource, masterTarget);
    logSuccess('Skill: master-orchestrator (auto-coordinator)');
    installed.push('master-orchestrator.md');
  }

  return installed;
}

export function getSkillsList(features) {
  return features
    .map((f) => SKILL_MAP[f])
    .filter(Boolean)
    .concat('master-orchestrator.md');
}
