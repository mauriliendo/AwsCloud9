#!/bin/bash -xe
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
yum update -y
yum install git -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install node
nvm use node
git clone https://github.com/abernalc/devops-mundos-e.git && cd devops-mundos-e/modulo-4/node-farm && npm install && node index.js &
