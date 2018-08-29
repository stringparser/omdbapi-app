FROM node:8.11.1
WORKDIR /usr/app

ARG OIMDBAPI_KEY

COPY . .
COPY .babelrc.js ./
RUN ls -la .
RUN npm install
COPY . .

ENV NODE_PORT 8080
ENV OIMDBAPI_KEY=$OIMDBAPI_KEY
EXPOSE 8080

CMD [ "npm", "run", "dev" ]
