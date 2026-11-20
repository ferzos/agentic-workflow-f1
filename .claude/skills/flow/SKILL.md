---
name: flow
description: Run one end-to-end pass of the workshop pipeline: dispatch with PRs until idle, review each new PR once with review-pr, dispatch once more, then print the final Next block unchanged. Never sets a gate, never merges, never loops dispatch itself. Use when the user asks to run the flow, advance the pipeline, or do a full dispatch and review pass.
---

# flow

## Steps

1. **Dispatch until idle.** Run once:
   `npm run -s dispatch -- --pr --until-idle`
   Keep its full output. The script does the looping; do not re-run it to make it loop.
2. **Find new PRs.** From the step 1 output, take the PR numbers that dispatch opened or updated in this run. Skip any PR you already reviewed in this session.
3. **Review each new PR once.** For each PR number, run the `review-pr` skill with `<n>`. One review per PR. Do not re-review after dispatch.
4. **Dispatch once more.** Run `npm run -s dispatch -- --pr` one time, so the tracker sees the posted reviews. Keep its output.
5. **Print the final Next block.** Copy the `Next` block from the step 4 output exactly as printed, with its commands unchanged. Do not add, remove or reword lines. If step 4 printed no `Next` block, print the step 4 output's last lines and say `no Next block in output`.

## Rules

- Never set a gate: `Plan approved`, `Human review`, `Visual Accepted`, or any `npm run item -- visual|review|approve`.
- Never run `npm run merge` or merge a PR by any other command.
- Never run `dispatch` more than twice (steps 1 and 4). Never loop it yourself or count passes.
- Do not run `babysit` or `plan:loop` / `build:loop` from this skill.
- Do not claim anything is "verified", "done" or "passing" from this run. Quote the Next block; it is the script's output.
- If a step fails, stop and report which step and its error. Do not retry.
