FROM node:16.14.0 as frontend

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

## build 후 process 종료할 때
RUN npm run build

## dev mode 실행 시킬 때
#EXPOSE 3000
#ENTRYPOINT ["npm", "start"]

