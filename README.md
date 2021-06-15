# WeTube PJT

나만의 유튜브 서비스를 만들어 추억을 공유하자 / 공부 영상 목적

- 여행 영상
- 가족 영상
- 연인 영상
- 공부 영상

# 기술스택

- Node JS
  - Express
  - Babel
  - Github Login
- MongoDB

# 아키텍쳐

1. Global
   /
   /join
   /login
   /search

2. User
   /users/:id
   /user/logout
   /users/edit
   /users/delete
   /github/start
   /github/finish

3. Video
   /videos/:id
   /videos/:id/edit
   /videos/:id/delete
   /videos/upload

COOKIE_SECRET=anfiop12312iondafopinnwaefnpwaei
DB_URL=mongodb://127.0.0.1:27017/wooktube
GH_CLIENT=b84417bed75c79ff7ec0
GH_SECRET=fc84c718cbf428c483af0db17e261ee923babac5
