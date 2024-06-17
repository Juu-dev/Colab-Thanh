#!/bin/sh
# Note Condition: git status with no staging files exclude this file
git filter-branch -f --env-filter '
CORRECT_NAME="daniellovecode"
CORRECT_EMAIL="daniel.do.works@gmail.com"
export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
' --tag-name-filter cat -- --branches --tags


# Wrong command
# git filter-repo --mailmap <(echo 'thong.pm772002@gmail.com daniellovecode <daniel.do.works@gmail.com>')
