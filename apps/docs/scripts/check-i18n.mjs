/* eslint-disable no-console */
/**
 * i18n drift checker for scribble-ui docs site.
 *
 * Walks every dictionary file under
 *   apps/docs/i18n/dictionaries/{zh-CN,en-US}/components/<slug>.ts
 * and compares the *shape* (recursive set of object keys) of the exported
 * dictionary object between the two locales. Any drift — extra key in one
 * side, missing key in the other — is reported and the script exits 1.
 *
 * It also cross-checks the two top-level index.ts dictionary objects
 * (zhCN / enUS) to catch drift in shared scaffolding (nav, topbar, home, …),
 * AND verifies that every slug listed in `i18n/groups.ts` (the structural
 * grouping shared by sidebar + home page) has a matching translation
 * record under `home.items.<slug>` in both locales — and vice versa, no
 * orphan items in the dictionary that aren't in any group.
 *
 * Implementation note:
 *   We parse each file with the TypeScript compiler API (already a docs
 *   devDep, no extra install required) and walk the AST of the right-hand
 *   side of the top-level `export const xxx<Zh|En>: ... = { ... }`
 *   declaration. Only object literal property keys are recorded; values
 *   themselves are intentionally ignored — drift detection is structural.
 *
 * Run with:  pnpm --filter docs i18n:check
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(here, '..');
const i18nRoot = join(docsRoot, 'i18n', 'dictionaries');
const zhComponentsDir = join(i18nRoot, 'zh-CN', 'components');
const enComponentsDir = join(i18nRoot, 'en-US', 'components');
const zhIndex = join(i18nRoot, 'zh-CN', 'index.ts');
const enIndex = join(i18nRoot, 'en-US', 'index.ts');

// Resolve the docs-local typescript install (pnpm hoists it under apps/docs).
const localRequire = createRequire(pathToFileURL(join(docsRoot, 'package.json')));
let ts;
try {
  ts = localRequire('typescript');
} catch (err) {
  console.error(
    '[i18n:check] Cannot find the typescript package. Is `pnpm install` run inside apps/docs?',
  );
  console.error(err);
  process.exit(2);
}

/* ------------------------------------------------------------------ *
 * Phase 1: AST → key tree
 * ------------------------------------------------------------------ */

/**
 * @typedef {{ leaf: true } | { leaf: false; children: Map<string, KeyNode> }} KeyNode
 */

/** @returns {KeyNode} */
function leafNode() {
  return { leaf: true };
}

/** @returns {KeyNode} */
function branchNode() {
  return { leaf: false, children: new Map() };
}

/**
 * Walk an `ObjectLiteralExpression` and return a recursive map of
 * property name → KeyNode.
 *
 * @param {import('typescript').ObjectLiteralExpression} obj
 * @returns {KeyNode}
 */
function objectToKeyTree(obj) {
  const node = branchNode();
  for (const prop of obj.properties) {
    // Only handle plain `name: value` and shorthand `name`.
    let name;
    if (ts.isPropertyAssignment(prop)) {
      name = propertyName(prop.name);
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      name = prop.name.text;
    } else {
      // Spreads, getters, methods etc. — not used by our dictionaries.
      continue;
    }
    if (name == null) continue;

    if (ts.isPropertyAssignment(prop)) {
      const init = prop.initializer;
      if (ts.isObjectLiteralExpression(init)) {
        node.children.set(name, objectToKeyTree(init));
      } else {
        node.children.set(name, leafNode());
      }
    } else {
      node.children.set(name, leafNode());
    }
  }
  return node;
}

/**
 * @param {import('typescript').PropertyName} pn
 * @returns {string | undefined}
 */
function propertyName(pn) {
  if (ts.isIdentifier(pn)) return pn.text;
  if (ts.isStringLiteral(pn) || ts.isNoSubstitutionTemplateLiteral(pn)) return pn.text;
  if (ts.isNumericLiteral(pn)) return pn.text;
  return undefined;
}

/**
 * Parse a TS source file and return the key tree of the *first* top-level
 * `export const X: ... = { ... }` whose initializer is an object literal.
 * Returns `null` if no such declaration exists.
 *
 * @param {string} filePath
 * @returns {{ name: string; tree: KeyNode } | null}
 */
function parseDictionaryFile(filePath) {
  const src = readFileSync(filePath, 'utf8');
  const sf = ts.createSourceFile(filePath, src, ts.ScriptTarget.ES2022, true);

  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const isExported = (stmt.modifiers ?? []).some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) continue;

    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      const init = decl.initializer;
      if (!init) continue;
      if (!ts.isObjectLiteralExpression(init)) continue;
      return { name: decl.name.text, tree: objectToKeyTree(init) };
    }
  }
  return null;
}

/* ------------------------------------------------------------------ *
 * Phase 2: tree diff
 * ------------------------------------------------------------------ */

/**
 * @param {KeyNode} a
 * @param {KeyNode} b
 * @param {string[]} path
 * @param {{ aOnly: string[]; bOnly: string[]; typeMismatch: string[] }} acc
 */
function diffTrees(a, b, path, acc) {
  if (a.leaf && b.leaf) return;
  if (a.leaf !== b.leaf) {
    // One side is a string leaf, the other is a nested object — structural mismatch.
    acc.typeMismatch.push(
      `${path.join('.') || '<root>'} — leaf vs object (${a.leaf ? 'A leaf' : 'A object'} / ${
        b.leaf ? 'B leaf' : 'B object'
      })`,
    );
    return;
  }
  // Both are branches.
  const aKeys = new Set(a.children.keys());
  const bKeys = new Set(b.children.keys());

  for (const k of aKeys) {
    if (!bKeys.has(k)) {
      acc.aOnly.push([...path, k].join('.'));
    }
  }
  for (const k of bKeys) {
    if (!aKeys.has(k)) {
      acc.bOnly.push([...path, k].join('.'));
    }
  }
  for (const k of aKeys) {
    if (bKeys.has(k)) {
      diffTrees(a.children.get(k), b.children.get(k), [...path, k], acc);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Phase 3: orchestrate
 * ------------------------------------------------------------------ */

/**
 * @param {string} dir
 * @returns {string[]} component slugs (basenames without extension), sorted.
 */
function listComponentSlugs(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.ts'))
    .map((f) => basename(f, '.ts'))
    .sort();
}

let totalErrors = 0;
const driftedSlugs = [];

/**
 * @param {string} label
 * @param {string} zhPath
 * @param {string} enPath
 */
function compareFile(label, zhPath, enPath) {
  if (!existsSync(zhPath)) {
    console.error(`✗ ${label}: zh file missing — ${zhPath}`);
    totalErrors++;
    return;
  }
  if (!existsSync(enPath)) {
    console.error(`✗ ${label}: en file missing — ${enPath}`);
    totalErrors++;
    return;
  }

  const zh = parseDictionaryFile(zhPath);
  const en = parseDictionaryFile(enPath);
  if (!zh) {
    console.error(`✗ ${label}: no exported object literal found in zh file`);
    totalErrors++;
    return;
  }
  if (!en) {
    console.error(`✗ ${label}: no exported object literal found in en file`);
    totalErrors++;
    return;
  }

  const acc = { aOnly: [], bOnly: [], typeMismatch: [] };
  diffTrees(zh.tree, en.tree, [], acc);

  if (acc.aOnly.length === 0 && acc.bOnly.length === 0 && acc.typeMismatch.length === 0) {
    return; // clean
  }

  totalErrors += acc.aOnly.length + acc.bOnly.length + acc.typeMismatch.length;
  driftedSlugs.push(label);
  console.error(`\n✗ ${label}`);
  if (acc.aOnly.length > 0) {
    console.error(`    en is missing ${acc.aOnly.length} key(s) present in zh:`);
    for (const k of acc.aOnly) console.error(`      - ${k}`);
  }
  if (acc.bOnly.length > 0) {
    console.error(`    zh is missing ${acc.bOnly.length} key(s) present in en:`);
    for (const k of acc.bOnly) console.error(`      - ${k}`);
  }
  if (acc.typeMismatch.length > 0) {
    console.error(`    structural type mismatches:`);
    for (const m of acc.typeMismatch) console.error(`      - ${m}`);
  }
}

console.log('[i18n:check] scribble-ui docs dictionary drift check\n');

// (a) Top-level index.ts
console.log('· top-level index.ts (nav, topbar, home, …)');
compareFile('<index.ts>', zhIndex, enIndex);

// (b) Per-component
const zhSlugs = listComponentSlugs(zhComponentsDir);
const enSlugs = listComponentSlugs(enComponentsDir);

console.log(`\n· per-component dictionaries  zh: ${zhSlugs.length} files, en: ${enSlugs.length} files`);

// Slug-level drift (file-level missing).
const zhSet = new Set(zhSlugs);
const enSet = new Set(enSlugs);
for (const s of zhSlugs) {
  if (!enSet.has(s)) {
    console.error(`✗ component "${s}" exists in zh-CN but not in en-US`);
    totalErrors++;
  }
}
for (const s of enSlugs) {
  if (!zhSet.has(s)) {
    console.error(`✗ component "${s}" exists in en-US but not in zh-CN`);
    totalErrors++;
  }
}

const sharedSlugs = zhSlugs.filter((s) => enSet.has(s));
for (const slug of sharedSlugs) {
  compareFile(
    `${slug}.ts`,
    join(zhComponentsDir, `${slug}.ts`),
    join(enComponentsDir, `${slug}.ts`),
  );
}

/* ------------------------------------------------------------------ *
 * (c) groups.ts ↔ home.items parity
 *
 * `apps/docs/i18n/groups.ts` is the single source of truth for which
 * slug appears in which group, in what order, on the sidebar AND home
 * page. A slug listed there must have a matching entry under
 * `dict.home.items.<slug>` in BOTH locale dictionaries; conversely,
 * every key under `home.items` must belong to exactly one group.
 *
 * This catches two real-world drift scenarios:
 *   - new component added to groups.ts but forgotten in dictionaries
 *     → 404-style render glitch on the home page
 *   - new translation added to dictionaries but forgotten in groups.ts
 *     → orphaned record, never reachable via UI
 * ------------------------------------------------------------------ */

console.log('\n· groups.ts ↔ home.items parity');

const groupsFile = join(docsRoot, 'i18n', 'groups.ts');
let groupSlugs = null;
try {
  const groupsSrc = readFileSync(groupsFile, 'utf8');
  const sf = ts.createSourceFile(groupsFile, groupsSrc, ts.ScriptTarget.ES2022, true);
  // Find: export const COMPONENT_GROUPS: ... = [ { key, items: [...] }, ... ] as const;
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const isExported = (stmt.modifiers ?? []).some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.name.text !== 'COMPONENT_GROUPS') continue;
      let init = decl.initializer;
      if (init && ts.isAsExpression(init)) init = init.expression;
      if (!init || !ts.isArrayLiteralExpression(init)) continue;
      const collected = [];
      for (const groupNode of init.elements) {
        if (!ts.isObjectLiteralExpression(groupNode)) continue;
        for (const prop of groupNode.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const pname = propertyName(prop.name);
          if (pname !== 'items') continue;
          let arr = prop.initializer;
          if (arr && ts.isAsExpression(arr)) arr = arr.expression;
          if (!arr || !ts.isArrayLiteralExpression(arr)) continue;
          for (const lit of arr.elements) {
            if (
              ts.isStringLiteral(lit) ||
              ts.isNoSubstitutionTemplateLiteral(lit)
            ) {
              collected.push(lit.text);
            }
          }
        }
      }
      groupSlugs = collected;
    }
  }
} catch (err) {
  console.error(`✗ groups.ts: failed to read or parse — ${err.message}`);
  totalErrors++;
}

if (!groupSlugs) {
  console.error(
    `✗ groups.ts: could not extract COMPONENT_GROUPS slugs — check the export shape`,
  );
  totalErrors++;
} else {
  // Detect duplicates inside groups.ts itself.
  const seen = new Set();
  const dupes = [];
  for (const s of groupSlugs) {
    if (seen.has(s)) dupes.push(s);
    else seen.add(s);
  }
  if (dupes.length > 0) {
    console.error(`✗ groups.ts: slug(s) appear in multiple groups: ${dupes.join(', ')}`);
    totalErrors += dupes.length;
  }

  // Pull the home.items keys out of each locale's index.ts. We reuse
  // the existing parseDictionaryFile + key tree to read the names.
  for (const [label, indexPath] of [
    ['zh-CN', zhIndex],
    ['en-US', enIndex],
  ]) {
    const parsed = parseDictionaryFile(indexPath);
    if (!parsed) {
      console.error(`✗ groups parity: cannot parse ${label} index.ts`);
      totalErrors++;
      continue;
    }
    const home = parsed.tree.leaf ? null : parsed.tree.children.get('home');
    const items =
      home && !home.leaf ? home.children.get('items') : null;
    if (!items || items.leaf) {
      console.error(`✗ groups parity: ${label} dict has no home.items object`);
      totalErrors++;
      continue;
    }
    const dictSlugs = new Set(items.children.keys());
    const groupSet = new Set(groupSlugs);

    const missingInDict = [...groupSet].filter((s) => !dictSlugs.has(s));
    const orphanInDict = [...dictSlugs].filter((s) => !groupSet.has(s));

    if (missingInDict.length > 0) {
      console.error(
        `✗ groups parity (${label}): slug(s) in groups.ts but missing from home.items:`,
      );
      for (const s of missingInDict) console.error(`      - ${s}`);
      totalErrors += missingInDict.length;
    }
    if (orphanInDict.length > 0) {
      console.error(
        `✗ groups parity (${label}): home.items has key(s) not listed in any group:`,
      );
      for (const s of orphanInDict) console.error(`      - ${s}`);
      totalErrors += orphanInDict.length;
    }
  }
}

// Summary
console.log('\n──────────────────────────────────────────────────────────────');
if (totalErrors === 0) {
  console.log(
    `✓ All ${sharedSlugs.length} component dictionaries + index.ts are in sync between zh-CN and en-US.`,
  );
  console.log(
    `✓ groups.ts (${groupSlugs ? groupSlugs.length : '?'} slugs) ↔ home.items parity OK in both locales.`,
  );
  process.exit(0);
} else {
  const dictPart =
    driftedSlugs.length > 0
      ? `dictionary drift in ${driftedSlugs.length} location(s)`
      : '';
  const summary = dictPart || 'parity errors';
  console.error(`✗ ${summary} — ${totalErrors} issue(s) total.`);
  console.error(
    '  Fix the listed items to keep zh-CN ↔ en-US dictionaries and groups.ts ↔ home.items aligned.',
  );
  process.exit(1);
}
