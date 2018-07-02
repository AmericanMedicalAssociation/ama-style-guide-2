#!/bin/sh
set -e # Exit with nonzero exit code if anything fails

# Setup a deploy branch
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  BRANCH_ID="${TRAVIS_PULL_REQUEST}"
else
  BRANCH_ID="${TRAVIS_BRANCH}"
fi

deploy_branch="test-results-${BRANCH_ID}"

# Fail if we still don't know where the repo is.
echo "Deploying to the SG2 repo at '${REPO}'."
if [ -z "${REPO}" ] ; then
    echo "Cannot deploy without a repo."
    exit 1
fi

echo "Setting up git"
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"
git clone --bare "${REPO}" artifacts/current/.git

# Don't do anything else if it didn't work.
if git remote -v | grep -q 'github'
then
    echo "clone failed"
    exit 1
fi

echo "Committing to ${deploy_branch}."
git checkout -b "${deploy_branch}"
git add backstop_data/
git commit --message "Travis build: ${TRAVIS_BUILD_ID}"

echo "Deploying to ${deploy_branch}."
git push origin ${deploy_branch}
