import { ApolloClient, InMemoryCache } from "@apollo/client";

export const GraphQLServiceUrl = window.location.port == 4200 ? "http://localhost:8081/graphql" : '/graphql';
const client = new ApolloClient({
  uri: GraphQLServiceUrl,
  cache: new InMemoryCache(),
});

export default client;
