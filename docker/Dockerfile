FROM node:16-alpine3.16 as builder

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN yarn install \
    &&  yarn typedoc --theme default

From oap75/serve-nginx

COPY --from=builder /usr/src/app/docs /usr/share/nginx/html
#COPY --from=builder /usr/src/app/docs/index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
