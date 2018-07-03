#!/bin/sh
set -e # Exit with nonzero exit code if anything fails

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
git commit --message "Travis build: ${TRAVIS_BUILD_ID}"

echo "Deploying to ${git_deploy_branch}."
# Force push in case there were artifacts for this PR / branch before.
git push -f origin ${git_deploy_branch}
