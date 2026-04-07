FROM node:22-alpine

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY frontend/ ./

EXPOSE 5173

CMD ["yarn", "dev", "--host"]
