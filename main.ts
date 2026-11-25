'use strict';

const fs = require('node:fs');
const path = require('node:path');

// One-line roast of my own AI agent: recursive tool calls that go nowhere.
const ENTRY =
  "My agent's favorite tool is the one that calls another tool to check if the first tool worked.";

function validate(entry) {
  if (typeof entry !== 'string' || entry.trim().length === 0) {
    throw new Error('entry must not be empty or only whitespace');
  }
  if (entry.length < 1 || entry.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${entry.length}`);
  }
  if (entry.includes('\n') || entry.includes('\r')) {
    throw new Error('entry must be exactly one line');
  }
}

function main() {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || path.join(__dirname, 'output');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'entry.txt'), ENTRY + '\n', 'utf8');
}

main();
