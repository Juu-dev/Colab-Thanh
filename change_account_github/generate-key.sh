#!/bin/sh
cd ~/.ssh
# ssh-keygen -t rsa -C "your-email-address" -f "id_rsa-username"
ssh-keygen -t rsa -C "daniel.do.works@gmail.com" -f "id_rsa-daniel"

eval "$(ssh-agent -s)"

cat ~/.ssh/github-daniel.pub

touch config

code config

# ========== Clone 
# git clone git@github.com-{your-username}:{owner-user-name}/{the-repo-name}.git

# ========== Config 
# git config user.email "daniel.do.works@gmail.com"
# git config user.name "daniellovecode"

# git config user.email "thong.pm772002@gmail.com"
# git config user.name "Juu-dev"

# ========== Push
# git remote add origin git@github.com-daniellovecode:daniellovecode
# git remote add origin git@github.com-Juu-dev:rahul-office

