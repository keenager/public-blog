---
title: "빌드 및 재배포 과정"
createDate: "2024-01-31"
updateDate: "2024-01-31"
excerpt: "클라우드에서 앱을 빌드하고 재배포하는 과정"
tag: "dev"
---

1. ssh 접속
   `ssh -i [ssh키 이름].key ubuntu@[IP주소]`

1. pm2
   `sudo pm2 start "npm run start" --name [앱 이름]`
