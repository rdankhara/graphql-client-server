# Stage 1: Build
FROM node:23-alpine as build
WORKDIR /app

# Leverage caching by installing dependencies firset
COPY package*.json ./
RUN npm install #&& npm cache clean --force

# Copy th rest of the application code and build for the production
COPY . .
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist/bookstore-client/ /usr/share/nginx/html
EXPOSE 4200
CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 4200;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
