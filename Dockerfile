FROM node:17-alpine3.14
ENV NODE_ENV development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]