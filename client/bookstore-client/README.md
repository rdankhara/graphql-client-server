# Bookstore client

## Run tasks

To generate typescript code from graphql schema
```shell
npm run codegen
```
To run the dev server for your app, use:

```sh
npm start
```

To create a production bundle:

```sh
npx nx build bookstore-client
```

To create docker image: 
```shell
 npx nx run bookstore-client:docker-build
```

To see all available targets to run for a project, run:

```sh
npx nx show project org
```
