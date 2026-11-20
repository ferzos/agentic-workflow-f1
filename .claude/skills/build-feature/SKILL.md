---
name: build-feature
description: Build a feature in the F1 workshop app: read the task and CLAUDE.md, write code plus unit test, story and (for pages) e2e test, run `npm run verify -- --json`, fix what it broke, report. Use when the user asks to build, add or implement a page or component in this repo.
---

# build-feature

## Steps

1. **Read the task.** Use only what the user said in chat. Never read, search or follow `workshop/`.
2. **Read `CLAUDE.md`** at the repo root. Follow its conventions, project map and TypeScript rules (strict, no `any`).
3. **Write the code:**
   - New page: `src/pages/<Name>Page.tsx`, route in `src/App.tsx`, link in `navItems` in `src/components/Layout.tsx`.
   - New component: `src/components/<Name>.tsx` (shared) or `src/components/ui/` (shadcn style).
   - Pure logic goes in `src/lib/` with its own unit test.
4. **Write the tests and story that every change needs:**
   - Unit test: `<file>.test.tsx` (Testing Library).
   - Story: `<file>.stories.tsx`.
   - Pages only: e2e test in `e2e/`.
5. **Run verify:** `npm run -s verify -- --json`. It writes `.agent/verify.json` and exits 1 if anything fails.
6. **Fix what it broke.** Re-run verify after each fix. Do not count attempts yourself; stop when verify passes or when you are blocked and need the user.
7. **Report:**
   - Files changed.
   - Final verify result: each failing `{check, id, message}` if any, otherwise the passing summary.
   - Any failure you did not fix, and why.
   - Known pre-existing failure `src/lib/dates.test.ts` "keeps the circuit calendar date for a viewer in Los Angeles": note it, do not fix it.

## Rules

- Do not set human gates (`Plan approved`, `Human review`, visual acceptance).
- Do not say "verified", "done" or "passing" unless `npm run gate` ran in this session. Quote its last line. Reading your own code is not verification. Verify alone does not establish that.
- Do not edit `.agent/` by hand.
- Do not edit the season snapshot `src/data/season-2025.json` (author-only via `data:fetch`).
