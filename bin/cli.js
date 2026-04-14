#!/usr/bin/env node

import { run } from '../src/index.js';

run().catch((err) => {
  console.error('\n❌ Fatal error:', err.message);
  process.exit(1);
});
