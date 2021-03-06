# base node image
FROM node:16-bullseye-slim as base

RUN apt-get update && apt-get install

# install all node_modules, including dev
FROM base as deps

ENV HUSKY_SKIP_INSTALL=1

RUN mkdir /app/
WORKDIR /app/

ADD package.json package-lock.json ./
RUN npm install --production=false

# setup production node_modules
FROM base as production-deps

RUN mkdir /app/
WORKDIR /app/

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json /app/
RUN npm prune --production

# build app
FROM base as build

ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

RUN mkdir /app/
WORKDIR /app/

COPY --from=deps /app/node_modules /app/node_modules

# app code changes all the time
ADD . .
RUN npm run build

# build smaller image for running
FROM base

ENV NODE_ENV=production

RUN mkdir /app/
WORKDIR /app/

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
ADD . .

EXPOSE 8080

CMD ["npm", "run", "start"]