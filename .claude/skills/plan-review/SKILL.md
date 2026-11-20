---
name: plan-review
description: One review pass over a task plan from plan-tasks. Judges single responsibility per task and broken in-between states (each PR must leave main working on its own). Returns pass or fail with issues. Use when the plan loop or user asks to review a plan.
---

# plan-review

## Steps

1. **Read the plan** given in the prompt (JSON from `plan-tasks`). Never read, search or follow `workshop/`.
2. **Read `CLAUDE.md`** and check each `files` path against the repo (`Glob`/`Read`). A path that a task does not create must exist.
3. **Judge each task, once:**
   - **Single responsibility.** One PR, one responsibility. Fail if a task mixes two (for example a page plus a pure function it could be split from, or a page plus a nav change plus a route for another page).
   - **Broken in-between states.** Assume each task merges alone, in `dependsOn` order, to `main`. Fail if, after any single task merges, `main` would have: a nav link or import pointing at a file or route no merged task creates; a test that asserts behaviour a later task adds; a missing file that a merged task imports.
   - Also check: each task has `acceptanceCriteria` and a `test` that names a real file type from the conventions; `dependsOn` has no cycles and only names existing ids.
4. **Return the verdict once.** One pass. Do not re-review after a fix; the plan loop decides what happens next.

## Output

```json
{
  "verdict": "pass",
  "issues": []
}
```

or

```json
{
  "verdict": "fail",
  "issues": [
    { "task": "t2", "kind": "responsibility | in-between-state | structure", "problem": "…", "fix": "…" }
  ]
}
```

`fix` is a concrete change (for example "move the nav link into t2 with the route", or "add t1 to dependsOn of t2"). Do not rewrite the plan yourself.

## Rules

- Judge only what is in the plan and the repo. Do not judge code quality or the idea itself.
- If you cannot tell whether a state is broken without a product decision, return `verdict: "fail"` with one issue of kind `structure` that names the decision. Do not guess.
- Never set human gates (`Plan approved`, `Human review`). Never count attempts.
