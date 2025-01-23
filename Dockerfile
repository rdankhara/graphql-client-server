# Stage 1: Build
FROM node:23-alpine as clinetBuild
WORKDIR /app

# Leverage caching by installing dependencies firset
COPY ./client/bookstore-client/package*.json ./
RUN npm install #&& npm cache clean --force

# Copy th rest of the application code and clinetBuild for the production
COPY ./client/bookstore-client .
RUN npm run build

# Api stage called "builder"
FROM eclipse-temurin:21 as builder
WORKDIR /project
ADD ./server /project
COPY --from=clinetBuild /app/dist/bookstore-client/ /project/src/main/resources/static
RUN ./mvnw package

# Last stage
# Smaller OS footprint using JRE
FROM eclipse-temurin:21
WORKDIR /app

# Copy only the Jar from the "builder" stage
COPY  --from=builder /project/target/bookstore-0.0.1-SNAPSHOT.jar /app

# Run the Jar = Final image only containers Second stage
CMD ["java", "-jar", "bookstore-0.0.1-SNAPSHOT.jar"]
