import { ApolloClient, InMemoryCache } from "@apollo/client";

export const GraphQLServiceUrl = "http://localhost:8080/graphql";
const client = new ApolloClient({
  uri: GraphQLServiceUrl,
  cache: new InMemoryCache(),
});

export default client;
