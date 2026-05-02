# Branch Protection Rules

> **Setup required:** Configure these rules in the GitHub repository settings under **Settings > Branches**.

## `master` (Production)

- [ ] **Require a pull request before merging**
  - Required approving reviews: 1
  - Dismiss stale PR approvals when new commits are pushed
  - Require review from code owners (if CODEOWNERS exists)

- [ ] **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks:
    - `Lint, Type Check, Test & Build` (from `pr-validation.yml`)

- [ ] **Require conversation resolution before merging**

- [ ] **Do not allow bypassing the above settings**

- [ ] **Restrict pushes that create files larger than 100MB**

- [ ] **Allow force pushes:** ❌ No
- [ ] **Allow deletions:** ❌ No

## `develop` (Staging)

- [ ] **Require a pull request before merging**
  - Required approving reviews: 1

- [ ] **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks:
    - `Lint, Type Check, Test & Build` (from `pr-validation.yml`)

- [ ] **Allow force pushes:** ❌ No
- [ ] **Allow deletions:** ❌ No

## Required Repository Secrets

Configure these in **Settings > Secrets and variables > Actions**:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token for deployments |
| `VERCEL_ORG_ID` | Vercel team/org ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key for build |
| `CLERK_SECRET_KEY` | Clerk secret key for build |
| `LHCI_GITHUB_APP_TOKEN` | (Optional) Lighthouse CI GitHub app token |

## Notes

- The `develop` branch does not exist yet. Create it from `master` after this PR merges.
- The `lighthouse-ci.yml` workflow requires a `lighthouserc.json` at repo root to define URLs to audit.
