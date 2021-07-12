import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Announcement = {
  __typename?: "Announcement";
  id: Scalars["Int"];
  fellowship: FellowshipEnum;
  title: Scalars["String"];
  body: Scalars["String"];
  updated_ts: Scalars["Date"];
  created_ts: Scalars["Date"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type PaginatedUsers = {
  __typename?: "PaginatedUsers";
  users: Array<User>;
  count: Scalars["Int"];
};

export type Project = {
  __typename?: "Project";
  id: Scalars["Int"];
  name: Scalars["String"];
  description: Scalars["String"];
  icon_url: Scalars["String"];
  updated_ts: Scalars["Date"];
  created_ts: Scalars["Date"];
  users: Array<User>;
};

export type Query = {
  __typename?: "Query";
  allProjects: Array<Project>;
  allUsers?: Maybe<PaginatedUsers>;
  project: Project;
  user: User;
  announcements: Array<Announcement>;
};

export type QueryAllUsersArgs = {
  take?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<Scalars["Int"]>;
  fellowship?: Maybe<Array<Scalars["String"]>>;
};

export type QueryProjectArgs = {
  id: Scalars["Int"];
};

export type QueryUserArgs = {
  id: Scalars["Int"];
};

export type QueryAnnouncementsArgs = {
  fellowship?: Maybe<Array<Scalars["String"]>>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Int"];
  name: Scalars["String"];
  bio: Scalars["String"];
  avatar_url: Scalars["String"];
  fellowship: UserFellowEnum;
  updated_ts: Scalars["Date"];
  created_ts: Scalars["Date"];
  projects: Array<Project>;
};

export enum FellowshipEnum {
  All = "all",
  Writers = "writers",
  Founders = "founders",
}

export enum UserFellowEnum {
  Founders = "founders",
  Angels = "angels",
  Writers = "writers",
}

export type GetProjectQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GetProjectQuery = { __typename?: "Query" } & {
  project: { __typename?: "Project" } & Pick<
    Project,
    "id" | "name" | "description" | "icon_url"
  > & {
      users: Array<
        { __typename?: "User" } & Pick<User, "id" | "name" | "avatar_url">
      >;
    };
};

export type GetAllUsersQueryVariables = Exact<{
  fellowships?: Maybe<Array<Scalars["String"]> | Scalars["String"]>;
  cursor?: Maybe<Scalars["Int"]>;
  take?: Maybe<Scalars["Int"]>;
  includeProjects: Scalars["Boolean"];
}>;

export type GetAllUsersQuery = { __typename?: "Query" } & {
  allUsers?: Maybe<
    { __typename?: "PaginatedUsers" } & Pick<PaginatedUsers, "count"> & {
        users: Array<
          { __typename?: "User" } & Pick<
            User,
            | "id"
            | "name"
            | "bio"
            | "fellowship"
            | "avatar_url"
            | "updated_ts"
            | "created_ts"
          > & {
              projects?: Maybe<
                Array<
                  { __typename?: "Project" } & Pick<
                    Project,
                    | "id"
                    | "name"
                    | "description"
                    | "icon_url"
                    | "updated_ts"
                    | "created_ts"
                  >
                >
              >;
            }
        >;
      }
  >;
};

export type GetAnounceMentsQueryVariables = Exact<{
  fellowship?: Maybe<Array<Scalars["String"]> | Scalars["String"]>;
}>;

export type GetAnounceMentsQuery = { __typename?: "Query" } & {
  announcements: Array<
    { __typename?: "Announcement" } & Pick<
      Announcement,
      "id" | "title" | "fellowship" | "created_ts" | "updated_ts" | "body"
    >
  >;
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  user: { __typename?: "User" } & Pick<
    User,
    | "id"
    | "name"
    | "bio"
    | "fellowship"
    | "avatar_url"
    | "updated_ts"
    | "created_ts"
  > & {
      projects: Array<
        { __typename?: "Project" } & Pick<
          Project,
          | "id"
          | "name"
          | "description"
          | "icon_url"
          | "updated_ts"
          | "created_ts"
        >
      >;
    };
};

export const GetProjectDocument = gql`
  query getProject($id: Int!) {
    project(id: $id) {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProjectQuery,
    GetProjectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(
    GetProjectDocument,
    options
  );
}
export function useGetProjectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectQuery,
    GetProjectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(
    GetProjectDocument,
    options
  );
}
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<
  typeof useGetProjectLazyQuery
>;
export type GetProjectQueryResult = Apollo.QueryResult<
  GetProjectQuery,
  GetProjectQueryVariables
>;
export const GetAllUsersDocument = gql`
  query getAllUsers(
    $fellowships: [String!]
    $cursor: Int
    $take: Int
    $includeProjects: Boolean!
  ) {
    allUsers(take: $take, cursor: $cursor, fellowship: $fellowships) {
      users {
        id
        name
        bio
        fellowship
        avatar_url
        updated_ts
        created_ts
        projects @include(if: $includeProjects) {
          id
          name
          description
          icon_url
          updated_ts
          created_ts
        }
      }
      count
    }
  }
`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      fellowships: // value for 'fellowships'
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      includeProjects: // value for 'includeProjects'
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options
  );
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<
  typeof useGetAllUsersLazyQuery
>;
export type GetAllUsersQueryResult = Apollo.QueryResult<
  GetAllUsersQuery,
  GetAllUsersQueryVariables
>;
export const GetAnounceMentsDocument = gql`
  query getAnounceMents($fellowship: [String!]) {
    announcements(fellowship: $fellowship) {
      id
      title
      fellowship
      created_ts
      updated_ts
      body
    }
  }
`;

/**
 * __useGetAnounceMentsQuery__
 *
 * To run a query within a React component, call `useGetAnounceMentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnounceMentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnounceMentsQuery({
 *   variables: {
 *      fellowship: // value for 'fellowship'
 *   },
 * });
 */
export function useGetAnounceMentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAnounceMentsQuery,
    GetAnounceMentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAnounceMentsQuery, GetAnounceMentsQueryVariables>(
    GetAnounceMentsDocument,
    options
  );
}
export function useGetAnounceMentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAnounceMentsQuery,
    GetAnounceMentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAnounceMentsQuery,
    GetAnounceMentsQueryVariables
  >(GetAnounceMentsDocument, options);
}
export type GetAnounceMentsQueryHookResult = ReturnType<
  typeof useGetAnounceMentsQuery
>;
export type GetAnounceMentsLazyQueryHookResult = ReturnType<
  typeof useGetAnounceMentsLazyQuery
>;
export type GetAnounceMentsQueryResult = Apollo.QueryResult<
  GetAnounceMentsQuery,
  GetAnounceMentsQueryVariables
>;
export const GetUserDocument = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id
      name
      bio
      fellowship
      avatar_url
      updated_ts
      created_ts
      projects {
        id
        name
        description
        icon_url
        updated_ts
        created_ts
      }
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
