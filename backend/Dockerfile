# Purpose: Builds the backend API container with dependencies installed before
# source code is copied, keeping Docker rebuilds fast during development.
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src

EXPOSE 5000

CMD ["npm", "start"]
