
#!/bin/sh
set -e # Exit with nonzero exit code if anything fails

TARGET_BRANCH="test-results"

setup_git() {
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout test-results
  git add backstop_data/
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GITHUB_TOKEN}@github.com/AmericanMedicalAssociation/ama-style-guide-2.git
  git push --force origin test-results
}

setup_git
commit_website_files
upload_files
