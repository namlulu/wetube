# WeTube PJT

나만의 유튜브 서비스를 만들어 추억을 공유하자

- 여행 영상
- 가족 영상
- 연인 영상

# 기술스택

- Node JS
  - Express
  - Babel
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

3. Video
   /videos/:id
   /videos/:id/edit
   /videos/:id/delete
   /videos/upload
