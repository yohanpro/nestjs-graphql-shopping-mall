# 이미지를 생성할 기반이 되는 공식 Node.js 이미지를 선택합니다.
FROM node:14

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 프로젝트의 package.json 및 package-lock.json 파일을 복사합니다.
COPY package*.json ./

# 애플리케이션 종속성을 설치합니다.
RUN npm install

# 프로젝트 소스 코드를 복사합니다.
COPY . .

# NestJS 애플리케이션을 빌드합니다.
RUN npm run build

# 3000 포트를 노출합니다.
EXPOSE 3000

# 애플리케이션을 실행합니다.
CMD ["npm", "run", "start:prod"]
