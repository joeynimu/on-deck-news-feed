import { useRouter } from "next/router";
import Layout from "components/Layout";
import UserCard from "components/UserCard";
import { useGetUserQuery } from "graphql-queries/generated/graphql";
import { FC } from "react";
import { BackButton } from "components/AnnouncementList";

const UserPage: FC = () => {
  const {
    query: { id = "0" },
  } = useRouter();
  const { data, loading, error } = useGetUserQuery({
    variables: {
      id: Number(id),
    },
  });

  return (
    <Layout>
      <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong :(</p>}
      {data?.user && <UserCard user={data?.user} />}
    </Layout>
  );
};

export default UserPage;
