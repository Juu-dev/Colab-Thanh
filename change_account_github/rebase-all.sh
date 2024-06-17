#!/bin/sh
# git rebase -i --root --exec "git commit --amend --no-edit" --autosquash
GIT_SEQUENCE_EDITOR="sed -i -re 's/^pick/edit/'" git rebase -i --root

