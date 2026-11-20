---
name: plan-tasks
description: Split one approved idea into 2–3 tasks, each one PR with one responsibility, listing files, acceptance criteria, a test and dependsOn. Ask (needs_human) instead of guessing. Use when the user or plan loop asks to plan, split or break down an idea into tasks for this repo.
---

# plan-tasks

## Steps

1. **Read the idea.** Use only the idea text given in chat or by the plan loop. Never read, search or follow `workshop/`.
2. **Read `CLAUDE.md`** and the project map. Check the files you plan to name actually exist (`Glob`/`Read`).
3. **Decide if you can plan it without guessing.** If the idea leaves a real choice open (which route, which data source, what a page shows, whether a shared component is in scope), stop and return `needs_human` (see Output). Do not pick a default for a product decision.
4. **Split into 2–3 tasks.** Each task:
   - is one PR,
   - has one responsibility (a page, or a pure function, or a nav link; not all three),
   - leaves `main` working on its own: no link to a route that does not exist yet, no import of a file a later task creates.
5. **Fill each task** with the fields below. Keep dependencies in `dependsOn`; a task with no dependency lists `[]`.
6. **Return the plan.** Return it as the output; do not write tracker items or files yourself. The plan loop writes them.

## Task fields

- `id`: `t1`, `t2`, `t3`.
- `title`: imperative, under 70 characters.
- `files`: exact repo-relative paths to create or change. Use the project map conventions (`src/pages/<Name>Page.tsx`, `src/lib/…`, `src/App.tsx` for routes, `src/components/Layout.tsx` for `navItems`).
- `acceptanceCriteria`: 1–3 checkable statements about behaviour, not about code.
- `test`: the test that proves the criteria: unit (`*.test.tsx` or `*.test.ts`), story (`*.stories.tsx`), or e2e (`e2e/`, pages only). Name the file and the case.
- `dependsOn`: ids of tasks that must merge first.

## Output

Success:

```json
{
  "status": "planned",
  "tasks": [
    {
      "id": "t1",
      "title": "…",
      "files": ["src/lib/…ts", "src/lib/…test.ts"],
      "acceptanceCriteria": ["…"],
      "test": "src/lib/…test.ts: 'case name'",
      "dependsOn": []
    }
  ]
}
```

Needs a human:

```json
{ "status": "needs_human", "question": "One question, with the options you see." }
```

## Rules

- Never set human gates (`Plan approved`, `Human review`). Those belong to the human.
- Never count attempts or retries. The plan loop owns that.
- Never invent a route, data field or driver/constructor id. Check `src/data/types.ts` and `src/lib/standings.ts`.
- Do not plan edits to `.agent/` or `src/data/season-2025.json`.
