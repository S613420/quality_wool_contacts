# Branch Protection Setup Guide

## Why Set Up Branch Protection?

Branch protection rules help maintain code quality and prevent accidental changes to your main branch. This is especially important for public repositories.

## Recommended Setup Steps

### 1. Go to Branch Protection Settings
1. Navigate to your repository: https://github.com/S613420/quality_wool_contacts
2. Go to **Settings → Branches**
3. Click **"Add rule"** or **"Add branch protection rule"**

### 2. Configure Protection Rules

**Branch name pattern:** `main`

**Recommended settings to enable:**

#### ✅ Protect matching branches
- [x] **Restrict pushes that create files larger than 100 MB**

#### ✅ Require a pull request before merging
- [x] **Require approvals: 1** (or 0 if you're the only contributor)
- [x] **Dismiss stale PR approvals when new commits are pushed**
- [x] **Require review from code owners** (if you have a CODEOWNERS file)

#### ✅ Require status checks to pass before merging
- [x] **Require branches to be up to date before merging**
- Select these status checks:
  - `test (18.x)` (from CI workflow)
  - `test (20.x)` (from CI workflow)
  - `build` (from deployment workflow)

#### ✅ Require conversation resolution before merging
- [x] **Require conversation resolution before merging**

#### ✅ Require linear history
- [x] **Require linear history** (prevents merge commits, cleaner history)

#### ✅ Additional restrictions
- [x] **Restrict pushes that create files larger than 100 MB**
- [x] **Block force pushes**
- [ ] **Restrict deletions** (optional, prevents branch deletion)

### 3. Save Protection Rule

Click **"Create"** to apply the branch protection rules.

## What This Means for Your Workflow

### ✅ **Benefits:**
- Prevents accidental force pushes to main
- Ensures all changes go through pull requests
- Guarantees tests pass before code reaches main
- Maintains clean commit history
- Provides audit trail of all changes

### 🔄 **New Workflow:**
1. Create feature branches for changes: `git checkout -b feature/my-feature`
2. Make changes and push to feature branch
3. Create pull request on GitHub
4. CI tests run automatically
5. Review and merge pull request (tests must pass)

### 🚫 **What You Can't Do Anymore:**
- Direct pushes to main branch
- Force push to main branch
- Merge PRs with failing tests

## For Solo Development

If you're the only developer, you can use a simpler setup:

1. **Require status checks** - Ensures tests pass
2. **Block force pushes** - Prevents accidental history rewriting
3. **Require pull requests: 0 approvals** - You can merge your own PRs

## Emergency Override

Repository admins can always bypass protection rules if needed:
- Go to the specific pull request
- Click **"Merge without waiting for requirements to be met"**
- Should only be used in emergencies

## Alternative: GitHub's "Recommended" Settings

GitHub also offers a quick setup option:
1. Go to Settings → Branches
2. Click **"Add rule"**
3. Select **"Restrict pushes that create files larger than 100 MB"**
4. This provides basic protection without workflow changes