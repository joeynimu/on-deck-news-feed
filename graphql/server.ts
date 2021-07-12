import { ApolloServer } from "apollo-server-micro";
import { context } from "./context";
import typeDefs from "./typedefs";
import resolvers from "./resolvers";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
