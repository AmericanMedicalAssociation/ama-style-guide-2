#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# This file requires two environmental variables that are set on Travis CI. See https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings.
# GITHUB_TOKEN must be a Github personal access token that has `repo` access, see https://github.com/settings/tokens.
# GITHUB_TOKEN_REPO must be in the format of `@github.com/[user]/[project].git`. Note the `/` after the `github.com` part which used for HTTPS connections.

# Setup a deploy branch
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  git_branch_id="${TRAVIS_PULL_REQUEST}"
else
  git_branch_id="${TRAVIS_BRANCH}"
fi

git_deploy_branch="visual-regression-testing-artifact/${git_branch_id}"

# Define the github repo using a token and environmental variables.
github_remote="https://${GITHUB_TOKEN}${GITHUB_TOKEN_REPO}"

# Fail if we still don't know where the repo is.
echo "Deploying to the SG2 repo at '${github_remote}'."
if [ -z "${github_remote}" ] ; then
    echo "Cannot deploy without a repo."
    exit 1
fi

echo "Setting up git"
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

mkdir visual-regression-testing-artifact
cd visual-regression-testing-artifact

git init

git remote add origin ${github_remote}

echo "Committing to ${git_deploy_branch}."
git checkout -b "${git_deploy_branch}"
# Copy artifacts
cp -R ../backstop_data/* .
git add .
# The commit message output causes issues with Travis when it is too long.
git commit --message "Travis build: ${TRAVIS_BUILD_ID}" --quiet

echo "Deploying to ${git_deploy_branch}."
# Force push in case there were artifacts for this PR / branch before.
git push -f origin ${git_deploy_branch}

# Print a link to the HTML report.
# strip the @github.com/ from the start.
github_deploy_path="${GITHUB_TOKEN_REPO/#@github.com\//}"
# strip the .git from the end
github_deploy_path="${github_deploy_path/%.git/}"

echo "You can review the generated visual regression testing report in a browser at http://htmlpreview.github.io/?https://github.com/${github_deploy_path}/blob/${git_deploy_branch}/html_report/index.html"
