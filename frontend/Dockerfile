# Purpose: Builds the frontend development container that serves the React app
# through Vite with hot reloading in Docker Compose.
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY index.html ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY public ./public
COPY src ./src

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
