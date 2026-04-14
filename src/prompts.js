import inquirer from 'inquirer';
import chalk from 'chalk';

export async function askSetupQuestions() {
  console.log(chalk.cyan('\n  Let\'s configure your elite development environment.\n'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: chalk.white('📦 Project name?'),
      default: 'my-project',
      validate: (v) => (v.trim() ? true : 'Project name is required'),
    },
    {
      type: 'list',
      name: 'level',
      message: chalk.white('🎯 What level of setup do you want?'),
      choices: [
        {
          name: chalk.yellow.bold('🔥 ELITE') + chalk.gray(' — Full production-grade: advanced frameworks, E2E testing, security gates, performance optimization, CI/CD'),
          value: 'elite',
        },
        {
          name: chalk.cyan.bold('⚡ STANDARD') + chalk.gray(' — Solid setup: core skills, basic testing, good practices'),
          value: 'standard',
        },
      ],
    },
    {
      type: 'list',
      name: 'projectType',
      message: chalk.white('🏗️  What are you building?'),
      choices: [
        { name: '🌐 Full-Stack Web App (Frontend + Backend + DB)', value: 'fullstack' },
        { name: '⚛️  Frontend SPA (React/Next.js/Vue)', value: 'frontend' },
        { name: '🔧 Backend API (REST/GraphQL)', value: 'backend' },
        { name: '📱 Mobile App (React Native/Flutter)', value: 'mobile' },
        { name: '🤖 CLI Tool / Library', value: 'cli' },
        { name: '🧠 AI/ML Application', value: 'ai' },
        { name: '📦 General Purpose', value: 'general' },
      ],
    },
    {
      type: 'list',
      name: 'stack',
      message: chalk.white('⚙️  Primary tech stack?'),
      choices: (ans) => getStackChoices(ans.projectType),
    },
    {
      type: 'list',
      name: 'language',
      message: chalk.white('📝 Primary language?'),
      choices: [
        { name: 'TypeScript (Recommended)', value: 'typescript' },
        { name: 'JavaScript', value: 'javascript' },
        { name: 'Python', value: 'python' },
        { name: 'Go', value: 'go' },
        { name: 'Rust', value: 'rust' },
        { name: 'Java', value: 'java' },
        { name: 'C#', value: 'csharp' },
        { name: 'Other', value: 'other' },
      ],
    },
    {
      type: 'checkbox',
      name: 'features',
      message: chalk.white('🧩 Select features to enable:'),
      choices: (ans) => getFeatureChoices(ans.level),
      validate: (v) => (v.length > 0 ? true : 'Select at least one feature'),
    },
    {
      type: 'list',
      name: 'testingLevel',
      message: chalk.white('🧪 Testing strategy?'),
      choices: [
        {
          name: chalk.yellow.bold('TDD First') + chalk.gray(' — Write tests before code (Elite)'),
          value: 'tdd',
        },
        {
          name: chalk.cyan('Test After') + chalk.gray(' — Write tests after implementation'),
          value: 'test-after',
        },
        {
          name: chalk.gray('Minimal') + chalk.gray(' — Only critical path tests'),
          value: 'minimal',
        },
      ],
    },
    {
      type: 'checkbox',
      name: 'mcpServers',
      message: chalk.white('🔌 MCP Servers to install:'),
      choices: (ans) => getMcpChoices(ans.level),
    },
    {
      type: 'checkbox',
      name: 'plugins',
      message: chalk.white('🔌 Install existing plugins (token savers):'),
      choices: [
        {
          name: '🦴 Caveman — ~75% token savings (compressed communication)',
          value: 'caveman',
          checked: true,
        },
        {
          name: '🧠 Graphify — 71x token reduction (codebase knowledge graph)',
          value: 'graphify',
          checked: true,
        },
      ],
    },
    {
      type: 'confirm',
      name: 'progressTracking',
      message: chalk.white('📊 Enable session progress tracking? (progress.md)'),
      default: true,
    },
    {
      type: 'confirm',
      name: 'autoDetect',
      message: chalk.white('🔍 Auto-detect existing project? (scans package.json, requirements.txt, etc.)'),
      default: true,
    },
  ]);

  return answers;
}

function getStackChoices(projectType) {
  const stacks = {
    fullstack: [
      { name: 'Next.js + tRPC + Prisma + PostgreSQL', value: 'nextjs-trpc-prisma' },
      { name: 'Next.js + Express + MongoDB', value: 'nextjs-express-mongo' },
      { name: 'React + Node.js + PostgreSQL', value: 'react-node-pg' },
      { name: 'Vue + Fastify + MySQL', value: 'vue-fastify-mysql' },
      { name: 'SvelteKit + Drizzle + SQLite', value: 'sveltekit-drizzle' },
      { name: 'Django + React + PostgreSQL', value: 'django-react' },
      { name: 'Custom Stack', value: 'custom' },
    ],
    frontend: [
      { name: 'Next.js 14+ (App Router)', value: 'nextjs' },
      { name: 'React + Vite', value: 'react-vite' },
      { name: 'Vue 3 + Vite', value: 'vue-vite' },
      { name: 'SvelteKit', value: 'sveltekit' },
      { name: 'Astro', value: 'astro' },
      { name: 'Remix', value: 'remix' },
      { name: 'Custom', value: 'custom' },
    ],
    backend: [
      { name: 'Node.js + Express + PostgreSQL', value: 'express-pg' },
      { name: 'Node.js + Fastify + MongoDB', value: 'fastify-mongo' },
      { name: 'Python + FastAPI + PostgreSQL', value: 'fastapi-pg' },
      { name: 'Python + Django REST', value: 'django-rest' },
      { name: 'Go + Gin + PostgreSQL', value: 'go-gin' },
      { name: 'Rust + Actix + PostgreSQL', value: 'rust-actix' },
      { name: 'Custom', value: 'custom' },
    ],
    mobile: [
      { name: 'React Native + Expo', value: 'react-native-expo' },
      { name: 'React Native (Bare)', value: 'react-native' },
      { name: 'Flutter + Dart', value: 'flutter' },
      { name: 'Custom', value: 'custom' },
    ],
    cli: [
      { name: 'Node.js CLI', value: 'node-cli' },
      { name: 'Python CLI (Click/Typer)', value: 'python-cli' },
      { name: 'Go CLI (Cobra)', value: 'go-cli' },
      { name: 'Rust CLI (Clap)', value: 'rust-cli' },
      { name: 'Custom', value: 'custom' },
    ],
    ai: [
      { name: 'Python + LangChain + FastAPI', value: 'langchain-fastapi' },
      { name: 'Python + PyTorch + FastAPI', value: 'pytorch-fastapi' },
      { name: 'Node.js + LangChain.js', value: 'langchainjs' },
      { name: 'Custom', value: 'custom' },
    ],
    general: [
      { name: 'Node.js + TypeScript', value: 'node-ts' },
      { name: 'Python', value: 'python-general' },
      { name: 'Go', value: 'go-general' },
      { name: 'Rust', value: 'rust-general' },
      { name: 'Custom', value: 'custom' },
    ],
  };
  return stacks[projectType] || stacks.general;
}

function getFeatureChoices(level) {
  const core = [
    { name: '🔍 Code Review & Auditing', value: 'code-review', checked: true },
    { name: '🛡️ Security Auditing (OWASP)', value: 'security', checked: true },
    { name: '🧪 TDD Workflow', value: 'tdd', checked: true },
    { name: '🐛 Advanced Debugging', value: 'debugging', checked: true },
    { name: '📐 Architecture Review', value: 'architecture', checked: true },
  ];

  // UNIQUE skills that DON'T exist anywhere else
  const eliteFeatures = [
    { name: '💰 Token Budget Planner (AI cost optimization)', value: 'token-budget', checked: level === 'elite' },
    { name: '🏗️ Tech Debt Tracker (auto-detect & score debt)', value: 'tech-debt', checked: level === 'elite' },
    { name: '🔀 Migration Assistant (framework/version migrations)', value: 'migration', checked: level === 'elite' },
    { name: '⏱️ Effort Estimator (dev time estimation engine)', value: 'estimator', checked: level === 'elite' },
    { name: '🧬 Prompt Engineering Guide (optimal Claude prompts)', value: 'prompt-eng', checked: level === 'elite' },
    { name: '🔗 Dependency Intelligence (smart dep analysis)', value: 'dep-intel', checked: level === 'elite' },
    { name: '🔄 Session Handoff Protocol (continuity engine)', value: 'session-handoff', checked: level === 'elite' },
    { name: '🛡️ Error Recovery Playbook (smart error patterns)', value: 'error-recovery', checked: level === 'elite' },
    { name: '📐 Stack-Specific Patterns (dynamic best practices)', value: 'stack-patterns', checked: level === 'elite' },
    { name: '🚀 Ship Checklist (pre-deploy validation engine)', value: 'ship-checklist', checked: level === 'elite' },
  ];

  return [...core, ...eliteFeatures];
}

function getMcpChoices(level) {
  const core = [
    { name: '🧠 Sequential Thinking (Complex reasoning)', value: 'sequential-thinking', checked: true },
    { name: '💾 Memory Server (Cross-session memory)', value: 'memory', checked: true },
    { name: '📚 Context7 (Live documentation)', value: 'context7', checked: true },
  ];

  const extended = [
    { name: '🎭 Playwright (Browser testing)', value: 'playwright', checked: level === 'elite' },
    { name: '🐙 GitHub MCP (Repo management)', value: 'github', checked: level === 'elite' },
    { name: '📁 Filesystem (Enhanced file ops)', value: 'filesystem', checked: false },
    { name: '🎨 Stitch (UI design generation)', value: 'stitch', checked: false },
  ];

  return [...core, ...extended];
}
