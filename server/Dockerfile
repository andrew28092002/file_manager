FROM node:alpine
RUN mkdir -p usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
# будут установленны все зависимости, даже develop. лучше использовать npm install --only=prod, ещё запускают npm ci
RUN npm i
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]