This document will guide you through our workflow, from creating a branch to merging your code.

## Table of Contents

- [How to Contribute to telco](#how-to-contribute-to-telco)
  - [Table of Contents](#table-of-contents)
  - [The Core Principle](#the-core-principle)
  - [Your First Contribution (The Workflow)](#your-first-contribution-the-workflow)
    - [Step 1: Get Your Task](#step-1-get-your-task)
    - [Step 2: Create Your Branch](#step-2-create-your-branch)
      - [Make sure you are on the main branch and have the latest code](#make-sure-you-are-on-the-main-branch-and-have-the-latest-code)
      - [Create your new branch](#create-your-new-branch)
    - [Step 3: Do the Work \& Commit Your Changes](#step-3-do-the-work--commit-your-changes)
      - [Add your changed files](#add-your-changed-files)
      - [Commit your changes with a clear message](#commit-your-changes-with-a-clear-message)
    - [Step 4: Push Your Branch to GitHub](#step-4-push-your-branch-to-github)
    - [Step 5: Open a Pull Request (PR)](#step-5-open-a-pull-request-pr)
    - [Step 6: Code Review \& Merge](#step-6-code-review--merge)
@@ -44,40 +50,49 @@ All new work must be done on a new branch. We use a specific naming convention t

From the `main` branch, create your new branch.

#### Make sure you are on the main branch and have the latest code

```
git checkout main
git pull
```

#### Create your new branch

for example

```
git checkout -b type/short-description
```

**See the [Branch Naming Convention](https://www.google.com/search?q=%23reference-branch-naming-convention) below for what `type` to use.**

**Good Examples:**

- `feature/add-user-login-page`
- `bugfix/fix-submit-button-crash`
- `docs/update-readme-setup-guide`

### Step 3: Do the Work & Commit Your Changes

Make your code changes. As you save your work, you **must** use our commit message convention. This helps us create automatic changelogs and makes our history readable.

#### Add your changed files

```
git add .
```

#### Commit your changes with a clear message


git commit -m "type: description of your change"


**See the [Commit Message Convention](https://www.google.com/search?q=%23reference-commit-message-convention) below for details.**

**Good Examples:**

- `git commit -m "feat: Add email and password fields to login form"`
- `git commit -m "fix: Prevent crash when submit button is double-clicked"`

### Step 4: Push Your Branch to GitHub

@@ -89,19 +104,19 @@ git push origin feature/add-user-login-page

### Step 5: Open a Pull Request (PR)

1. Go to our repository on GitHub.
2. You will see a green button to **"Compare & create pull request"** for your new branch. Click it.
3. Fill out the **Pull Request Template**.
      - Give it a clear title (it should follow the commit convention, e.g., `feat: Add user login page`).
      - Fill out the description, linking the issue it solves (e.g., "Closes \#123").
4. Assign a reviewer from the team (or leave it for the team lead).

### Step 6: Code Review & Merge

A team member will review your code. They may leave comments or request changes.

- **If changes are requested:** Make the new commits on the *same branch*. The Pull Request will update automatically.
- **Once approved:** A team leader will **Squash and Merge** your PR into `main`. This combines all your commits into a single, clean commit on the `main` branch.

Your branch will be deleted automatically after merging. You can then pull the latest `main` branch and start on your next task\!

@@ -111,8 +126,8 @@ Your branch will be deleted automatically after merging. You can then pull the l

We use this format: **`type/short-description`**

- **`type`**: What *kind* of change is this?
- **`short-description`**: A few words (using hyphens) to describe the goal.

| Type | Description |
| :--- | :--- |
@@ -143,17 +158,17 @@ Format: **`type: description`**

### 💡 Good vs. Bad Commits

- **BAD:** `git commit -m "updated code"`

- **BAD:** `git commit -m "fixed bug"`

- **BAD:** `git commit -m "login page"`

- **GOOD:** `git commit -m "feat: Add user login form with validation"`

- **GOOD:** `git commit -m "fix: Correct password regex in validation logic"`

- **GOOD:** `git commit -m "docs: Update API endpoints in README"`

### Breaking Changes

@@ -167,7 +182,7 @@ If your commit introduces a change that will break existing functionality, add a

Don't ever get stuck\! If you have questions about the code, the workflow, or anything else:

1. Leave a comment on your **GitHub Issue or Pull Request**.
2. Ask in our team's **Whatsapp**.

We are all here to help each other succeed.
