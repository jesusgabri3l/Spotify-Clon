FROM node:16.17 as build-stage
RUN git clone https://github.com/jesusgabri3l/spotify-clon.git
WORKDIR /spotify-clon
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]