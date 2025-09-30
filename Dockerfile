# Dockerfile
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# El puerto que expone Next.js
EXPOSE 3000 
CMD ["npm", "run", "dev"]