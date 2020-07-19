FROM node:12.0-slim
COPY . .

ARG HOST
ENV HOST=${HOST}

RUN npm install
CMD [ "node", "index.js" ]