FROM node:12 as builder

COPY package-lock.json package.json /usr/src/app/
WORKDIR /usr/src/app/

RUN npm install --no-optional && npm cache clean --force
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .
RUN npm run build;

FROM node:12

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    librdkafka-dev \
    libsasl2-dev \
    libsasl2-2 \
    libsasl2-modules \
    libssl-dev

ENV NODE_ENV=production

COPY --from=builder /usr/src/app /usr/src/app

WORKDIR /usr/src/app
CMD [ "npm", "run", "start:prod" ]
