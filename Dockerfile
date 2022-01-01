FROM node:14-alpine as BUILDER
WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories 
COPY package.json /app/
RUN  apk --no-cache add \
  tzdata &&\
  cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  #   ln /usr/bin/python3 /usr/bin/python &&\
  #   npm install --quiet node-gyp -g &&\
  npm install  --registry=https://registry.npmmirror.com 

COPY . /app/
RUN npm run build 


FROM nginx:alpine 

COPY --from=BUILDER /app/dist /usr/share/nginx/html
# EXPOSE 3000
# RUN groupadd -r redis && useradd -r -g redis redis
# USER redisENV NODE_ENV production

# VOLUME [ "/app/data" ]
