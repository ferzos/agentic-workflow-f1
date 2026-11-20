---
name: babysit
description: Handle PR review threads in one of two modes the script selects. MODE triage is read-only: classify each thread as necessary (with evidence) or discussion, and draft replies. MODE fix changes code for exactly the necessary threads, runs the gate and quotes it. Never post, reply or resolve. Use when a loop or the user asks to babysit, triage or fix PR review threads.
---

# babysit

The prompt names the mode: `MODE: triage` or `MODE: fix`. Do only that mode.

## Shared steps

1. **Read the threads.** Use only the PR number in the prompt. Never read, search or follow `workshop/`.
   - `gh pr view <n> --json number,headRefName,headRefOid,state`
   - Unresolved review threads: `gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){reviewThreads(first:100){nodes{id isResolved path line comments(first:20){nodes{author{login} body}}}}}}}' -F o=<owner> -F r=<repo> -F n=<n>`
   - Keep only `isResolved: false`.
2. **Read `CLAUDE.md`** and the code each thread points at (`Read`).
3. **Classify each thread.** A thread is **necessary** only with evidence:
   - a **defect** you can point to (file and line, and the failing input or path),
   - a **broken acceptance criterion**, quoted from the task,
   - a **repo rule** you can cite (quote the `CLAUDE.md` line).

   Anything else is **discussion**: a question, a taste or style point, a suggestion without evidence, or a request you cannot tie to a rule. **When unsure, it is discussion.**

## MODE: triage (read-only)

- Touch no code. Do not run `Edit`, `Write` or any command that changes files.
- For each thread, output `{threadId, path, line, class: "necessary" | "discussion", evidence, draftReply}`.
  - `evidence` is required for `necessary`: the defect, quoted criterion, or cited rule.
  - `draftReply` is a short reply for the human to read. It is a draft only.
- Stop there. Report the list and the count of each class.

## MODE: fix

- Fix **exactly** the `necessary` threads. Leave every `discussion` thread untouched.
- Change only the lines the thread needs. Add or update the test that shows the defect is gone, as CLAUDE.md requires.
- Run `npm run -s gate`. Quote its last line verbatim. Do not claim "verified", "done" or "passing" without that quote.
- If the gate reports new failures, list them with their message. Do not retry or count attempts; report and stop.
- Report: threads fixed (threadId and what changed), threads left as discussion, and the gate's last line.

## Rules

- **Never post, reply or resolve.** Do not run `gh pr comment`, `gh api` with `POST`/`PUT`/`PATCH`/`DELETE`, or any GraphQL mutation. Reads only.
- Never set human gates (`Human review`, `Visual Accepted`, merge).
- Never edit `.agent/` by hand or `src/data/season-2025.json`.
- Do not include personal details (names, emails) in any output beyond what the thread already shows.
