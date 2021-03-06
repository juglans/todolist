FROM node:6
MAINTAINER juglans@qq.com
ENV HTTP_PORT 8080
COPY . /app  
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org

RUN npm run build
EXPOSE 8080
CMD ["node", "build/prd-server.js"]