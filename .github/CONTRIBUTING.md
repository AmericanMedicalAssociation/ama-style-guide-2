# Contributing

Below are the guidelines for contributing code to the American Medical Association Styleguide v2. Contributions of code must be made via pull request.

_Contributions must **not** be made without an accompanying JIRA ticket or GitHub issue._

**DO NOT SUBMIT OR REVIEW A PULL REQUEST UNLESS IT FOLLOWS THE [SG2 STANDARDS](../docs/standards.md).**


## Creating branches

This project follows a git branching workflow using `feature/branchname`, `bugfix/branchname`, `hotfix/branchname`. When creating a new branch, it **must** be based off of `develop`.

If you would like to include commits from a different branch that has not been merged, include those changes by checking out a new branch that is based on `develop`, and then use `git merge origin/NameOfBranchWithDesiredChanges`. This often works out better in the long run instead of 'chaining' feature branches off of each other directly.

## Pull Request Guidelines

* **All Pull Requests must follow the [Pull Request Template](PULL_REQUEST_TEMPLATE.md)**.
* Encapsulate your work in the smallest discrete chunks possible.
* Before creating a PR, run visual regression tests locally to ensure the work does not introduce any bugs into the codebase.
* The title must be a simple imperative sentence; examples,
    * Good: Add Symfony code style documentation.
    * Bad: Adding Symfony code style documentation. [bad because it is declarative]
* The title must include the JIRA ticket number and the title must match the summary of the JIRA ticket. **Do not work on work that has _not_ already been ticketed**; examples,
    * Good: [EWL-4421] Create News Header Organism
    * Bad: Tools clean up
* The PR must be atomic: the PR must address an indivisible and irreducible topic. The more atomic PRs are the more easily they can be reviewed and merged.
    * Do not address multiple issues in one PR.
* The PR description must:
    * give context: explain why you are creating the PR, e.g. reference the GitHub issue or JIRA ticket number it addresses
    * state the solution: the context must lead into what you did to resolve the issue
    * identify any follow up changes that will be needed and how that is going to be addressed, i.e. what does this PR not address?

* **Do not review a PR unless it follows the [SG2 Standards](../docs/standards.md)**.
    * If you find that a PR does not follow existing standards instead please add the `review standards` label to the PR and notify the developer and PM in a public slack channel (#dtt-web-dev or #project-styleguide) that you cannot review the PR until it follows the standards.
* If you create a branch you own it; no one else must modify it without your permission.
* If you wish to make a change to someone else's PR, either suggest it in a comment or ask the PR owner to meet with you for a pair programming session/discussion. Talking first can solve the problem sooner and increase knowledge sharing which is important to our team.
* All pull requests must include any creation or updates to relevant visual regression tests. For more infomration on how to do this please see the [How do I run tests?](https://issues.ama-assn.org:8446/confluence/pages/viewpage.action?pageId=23298568) document in Confluence.
* Travis will run visual regression tests against `gh-pages` on commits. The BackstopJS report from the latest Travis run can be seen on the `visual-regression-testing-artifact/[PULL_REQUEST_ID]` branch. Users can also view the test results in browser by filling in the Travis ID, `http://htmlpreview.github.io/?https://github.com/american-medical-association/ama-style-guide-2/blob/visual-regression-testing-artifact/[PULL_REQUEST_ID]/html_report/index.html`.

## Git Commit Guidelines

Commits must be atomic: the commit must be an indivisible and irreducible change. The commit message can be best described with an example, which we will model after Tim Pope's [blog post](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html):

    Capitalized, short (50 chars or less) summary.

    More detailed explanatory text, if necessary. Wrap it to 72
    characters. Think of the first line as a subject of an email and
    the rest as the body. The blank line separating the summary from
    the body is critical (unless you omit the body entirely); tools
    like rebase can get confused if you run the two together.

    Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
    or "Fixes bug." This convention matches up with commit messages generated
    by commands like git merge and git revert.

    Further paragraphs come after blank lines.

    - Bullet points are okay, too

    - Typically a hyphen or asterisk is used for the bullet, followed by a
      single space, with blank lines in between, but conventions vary here

    - Use a hanging indent

## Submitting work for review
When you have finished development work on a ticket:

1. Run visual regression tests locally to ensure the new work does not introduce any bugs into the codebase.
1. In JIRA, change the ticket status from `In Progress` to `Development Complete`.
1. Submit your PR to Github.
1. Make sure that under "Assignees" you have assigned yourself to the PR.
1. Add the label `ready for review` so others know they can begin reviewing.
1. Update the JIRA ticket with a link to the PR
1. If an open PR comes back with questions or requested changes, make sure the JIRA ticket is moved back to In Progress while you resume work on the issue.
1. When you are done making changes, add the `ready for review` label to the PR again and ping the original reviewer to let him/her know that your PR has been updated.

## Reviewing a PR
1. In Github
    - remove the `ready for review` label
    - add the `in review` label
    - assign yourself to the PR as a reviewer
2. Announce in the relevant Slack channel (#project-styleguide) that you are doing review of the PR.
3. Checkout the branch.
4. Review for code quality and test functionality:
    - Functionality: build your local environment. Check for expected behavior. The developer must have left some instructions for testing; follow these.
    - Visual QA: make sure nothing looks terribly broken. It's also usually a good idea to check against any style guide patterns linked in the "style guide" section of the PR template if applicable. Check responsive behavior. (Currently in our process, browser testing will be handled later.)
    - Code quality: follow [SG2 Standards](../docs/standards.md)! They're great! Individual repos have their own code standards, so be aware of those as well (Style Guide has a /docs folder, for Drupal follow Drupal best practices, etc.)
5. Run visual regression tests locally to ensure the new code does not introduce any bugs.
6. On your local machine merge `develop` into the branch to preview how the branch will interact with the rest of the code base once merged. It's not necessary to push the merge commit. Repeat steps 3-5.
7. Use the "Review" workflow features in GitHub to leave your review.
    - If changes are requested or the PR is not ready to merge:
        - Change the label to 'question`.
        - Change Jira ticket/s status from `Development Complete` to `In Progress` to indicate that the developer still needs to make changes.
        - If there are merge conflicts, please ask the developer to resolve these. In general, unless it's a quick and trivial change, please pass PRs back to the developer to make changes instead of pushing them yourself, as this fosters better communication/shared knowledge. That said, it's fine to offer to push code that may help out if it seems appropriate - just please notify the developer first.
    - If everything looks good:
        - Merge the branch to `develop`
        - Delete the feature branch.
        - Move JIRA ticket/s to `Testing` but **DO NOT re-assign** (leads will do that after release).
        - Comment that you have reviewed and merged the linked PRs.
