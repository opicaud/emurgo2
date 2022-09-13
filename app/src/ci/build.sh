#!/bin/bash

npm test
if [ $? -eq 0 ]
then
  npm version $1 -m "chore(app): new release %s"
  git checkout main
  git rebase master
  git push origin main
  git push --tags
  git checkout master
  git push origin master
fi
