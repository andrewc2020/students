FROM node:alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /usr/src/app
COPY ./package.json .

RUN npm install
COPY . .
RUN npm build





EXPOSE 8000
CMD [ "npm", "run", "execute" ]