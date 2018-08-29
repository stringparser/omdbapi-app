FROM node:8.11.1
WORKDIR /usr/src/app
RUN npm i
COPY . .
EXPOSE 8080
ENV NODE_PORT 8080
CMD [ "npm", "dev" ]
