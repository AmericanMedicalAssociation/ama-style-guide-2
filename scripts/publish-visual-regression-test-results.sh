#!/bin/sh
set -e # Exit with nonzero exit code if anything fails

# Setup a deploy branch
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  BRANCH_ID="${TRAVIS_PULL_REQUEST}"
else
  BRANCH_ID="${TRAVIS_BRANCH}"
fi

deploy_branch="visual-regression-testing-artifact/${BRANCH_ID}"

# Define the github repo using a token and environmental variables.
GITHUB_REPO="https://${GITHUB_TOKEN_VRT}${GITHUB_TOKEN_REPO}"

# Fail if we still don't know where the repo is.
echo "Deploying to the SG2 repo at '${GITHUB_REPO}'."
if [ -z "${GITHUB_REPO}" ] ; then
    echo "Cannot deploy without a repo."
    exit 1
fi

echo "Setting up git"
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

mkdir visual-regression-testing-artifact
cd visual-regression-testing-artifact

git init

git remote add origin ${GITHUB_REPO}

echo "Committing to ${deploy_branch}."
git checkout -b "${deploy_branch}"
# Copy artifacts
cp -R ../backstop_data/* .
git add .
git commit --message "Travis build: ${TRAVIS_BUILD_ID}"

echo "Deploying to ${deploy_branch}."
# Force push in case there were artifacts for this PR / branch before.
git push -f origin ${deploy_branch}
