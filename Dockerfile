FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-workspace.yaml* pnpm-lock.yaml* ./
COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared/package.json ./shared/

RUN pnpm install

COPY . .

RUN cd client && pnpm build

CMD ["sh", "-c", "cd client && pnpm build && cd ../server && pnpm run dev --host"]