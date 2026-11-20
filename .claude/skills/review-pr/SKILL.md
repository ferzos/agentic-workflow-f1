---
name: review-pr
description: Review one GitHub PR once and post line comments with gh as a single COMMENT review. Never approve or request changes. If nothing is worth a comment, post nothing and report 0 comments. Use when the user or a loop asks to review a PR in this repo.
---

# review-pr

## Steps

1. **Read the PR.** Use only the PR number given in the prompt. Never read, search or follow `workshop/`.
   - `gh pr view <n> --json number,title,body,headRefOid,baseRefName,isDraft,state`
   - `gh pr diff <n>`
2. **Read `CLAUDE.md`** and the changed files in context (`Read`). Judge against its conventions: unit test, story, e2e for pages, no `any`, route and nav registration, team colours as hex, no logos.
3. **Find real problems only.** Look for:
   - a bug, a wrong result or an unhandled case the code or tests do not cover,
   - a missing test, story or e2e that CLAUDE.md requires for the change,
   - a convention break from CLAUDE.md.
   Do not comment on style that Prettier or ESLint would catch, on taste, or on code you would merely write differently.
4. **Decide.** If nothing passes step 3, stop: post nothing and report `0 comments`.
5. **Post one review** with the comments that pass, as `COMMENT`:
   - Each comment anchors to a line that is in the diff (`side: "RIGHT"`, `line` in the new file). A comment on a line outside the diff is refused by GitHub; drop it.
   - One comment per problem. Say what fails and when, in one or two sentences. Suggest a fix only when it is one line.
   - Body is the review summary, one line.

   Build the JSON, then send it on stdin:

   ```bash
   gh api repos/{owner}/{repo}/pulls/<n>/reviews --input - <<'JSON'
   {
     "commit_id": "<headRefOid>",
     "event": "COMMENT",
     "body": "<one-line summary>",
     "comments": [
       { "path": "src/…", "line": 12, "side": "RIGHT", "body": "…" }
     ]
   }
   JSON
   ```

   Get `{owner}/{repo}` from `gh repo view --json nameWithOwner -q .nameWithOwner`.
6. **Report** one line: `N comments posted on PR #<n>` (or `0 comments`), and the review URL from the `gh api` response's `html_url` when you posted.

## Rules

- One pass. Review once, post once. Never re-review after a fix and never count attempts.
- Never send `APPROVE` or `REQUEST_CHANGES`. Only `COMMENT`.
- Never post a comment you cannot tie to a line in the diff and a concrete failure.
- Do not post to draft-only or closed PRs without asking first; report their state instead.
- Do not include the user's name, email or other personal details in the posted review.
- Do not claim the PR is "verified" or "passing". Reviewing is not verification; `npm run gate` is.
