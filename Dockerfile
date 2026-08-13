FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY . .

RUN mkdir -p /app/brain/notes /app/brain/todos /app/prompts && chown -R node:node /app

USER node

CMD ["node", "index.js"]