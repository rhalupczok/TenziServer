# FROM node:18
# WORKDIR /app
# COPY . /app
# RUN npm install
# ENV PORT 8080
# EXPOSE 8080
# CMD ["npm", "start"]

FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

# EXPOSE 8080

CMD [ "node", "server.js" ]