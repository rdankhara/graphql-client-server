FROM openjdk:23-slim
WORKDIR /app
COPY ./target/bookstore-0.0.1-SNAPSHOT.jar /app
# Copy only the Jar from the "builder" stage

# Run the Jar = Final image only containers Second stage
CMD ["java", "-jar", "bookstore-0.0.1-SNAPSHOT.jar"]

#if docker run -d bookstore  fails with below error message its known issue with docker version https://github.com/keycloak/keycloak/issues/17404
#[0.041s][warning][os,thread] Failed to start thread "GC Thread#0" - pthread_create failed (EPERM) for attributes: stacksize: 1024k, guardsize: 4k, detached.
#[0.041s][error  ][gc,task  ] Failed to create worker thread
# use command `docker run -d  --security-opt seccomp=unconfined bookstore`
