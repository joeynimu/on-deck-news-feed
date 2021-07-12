import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    updated_ts: Date!
    created_ts: Date!
    users: [User!]!
  }

  enum fellowshipEnum {
    all
    writers
    founders
  }

  enum userFellowEnum {
    founders
    angels
    writers
  }

  type Announcement {
    id: Int!
    fellowship: fellowshipEnum!
    title: String!
    body: String!
    updated_ts: Date!
    created_ts: Date!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: userFellowEnum!
    updated_ts: Date!
    created_ts: Date!
    projects: [Project!]!
  }

  type PaginatedUsers {
    users: [User!]!
    count: Int!
  }

  type Query {
    allProjects: [Project!]!
    allUsers(take: Int, cursor: Int, fellowship: [String!]): PaginatedUsers
    project(id: Int!): Project!
    user(id: Int!): User!
    announcements(fellowship: [String!]): [Announcement!]!
  }
`;

export default typeDefs;
