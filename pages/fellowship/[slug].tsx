import AnnouncementsList, { BackButton } from "components/AnnouncementList";
import Layout from "components/Layout";
import PageTitle from "components/PageTitle";
import {
  useGetAllUsersQuery,
  useGetAnounceMentsQuery,
} from "graphql-queries/generated/graphql";
import { useRouter } from "next/router";
import { StyledUL, UserList } from "components/UserCard";
import { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FellowShipPage() {
  const {
    query: { slug = "" },
  } = useRouter();
  const { loading, data, error } = useGetAnounceMentsQuery({
    variables: {
      fellowship: slug,
    },
  });

  const isWritersPage = slug === "writers";

  const {
    data: usersData,
    loading: isLoadingUsers,
    error: loadingUsersError,
    fetchMore,
    networkStatus,
  } = useGetAllUsersQuery({
    variables: {
      includeProjects: !isWritersPage,
      fellowships: isWritersPage ? [slug.toString()] : ["angels", "founders"],
    },
    notifyOnNetworkStatusChange: true,
  });
  const totalDataCount = usersData?.allUsers?.count || 0;
  const currentCount = usersData?.allUsers?.users?.length || 0;

  const hasNextPage = currentCount < totalDataCount;
  const isRefetching = networkStatus === 3;

  const containerRef = useRef(null);

  const onFetchMore = () =>
    fetchMore({
      variables: {
        cursor:
          usersData?.allUsers?.users[usersData.allUsers.users.length - 1].id,
        includeProjects: !isWritersPage,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (
          fetchMoreResult?.allUsers?.users?.length &&
          fetchMoreResult?.allUsers?.users?.length > 0
        ) {
          return {
            ...previousResult,
            allUsers: {
              ...fetchMoreResult.allUsers,
              count: previousResult?.allUsers?.count!,
              users: [
                ...previousResult?.allUsers?.users!,
                ...fetchMoreResult?.allUsers?.users,
              ],
            },
          };
        }
        return previousResult;
      },
    });

  return (
    <Layout>
      <PageTitle pageTitle={slug.toString()} />
      <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
      <h2>Announcements to all {slug}</h2>
      <AnnouncementsList
        loading={loading}
        data={data?.announcements}
        error={error}
      />
      {!loadingUsersError && usersData?.allUsers?.users && (
        <>
          <h2>
            {isWritersPage
              ? `Meet new Writers`
              : `Meet new Founders and Angels`}
          </h2>
          <InfiniteScroll
            dataLength={usersData?.allUsers?.users?.length || 0}
            next={onFetchMore}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <StyledUL>
              {usersData.allUsers?.users.map((user) => (
                <UserList user={user} key={user.id} projects={user?.projects} />
              ))}
            </StyledUL>
          </InfiniteScroll>
          {/* {hasNextPage && <button onClick={onFetchMore} disabled={isLoadingUsers || isRefetching}>{isRefetching ? `fetching` : `Load more`}</button>} */}
        </>
      )}
    </Layout>
  );
}
