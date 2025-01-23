#!/bin/sh
cd ./client/bookstore-client
npm run build
cp -r ./dist/bookstore-client/ ../../server/src/main/resources/static
cd ../../server
./mvnw package spring-boot:build-image
