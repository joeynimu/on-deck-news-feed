import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import Card from "components/Card";
import Grid from "components/Grid";
import { useGetAnounceMentsQuery } from "graphql-queries/generated/graphql";
import AnnouncementsList from "components/AnnouncementList";
import PageTitle from "components/PageTitle";

const fellowships = [
  { id: 1, name: "Founders", slug: "founders" },
  { id: 2, name: "Angels", slug: "angels" },
  { id: 3, name: "Writers", slug: "writers" },
];

export default function Home() {
  const { data, loading, error } = useGetAnounceMentsQuery({
    variables: {
      fellowship: "all",
    },
  });

  return (
    <Layout>
      <PageTitle pageTitle="On Deck Newsfeed" />
      <h2>Select a fellowship below for fine grained updates</h2>
      <Grid>
        {fellowships.map(({ name, id, slug }) => (
          <Card key={id}>
            <Link href={`/fellowship/${slug}`}>
              <a>
                <h3>{name}</h3>
              </a>
            </Link>
          </Card>
        ))}
      </Grid>
      <h2>Announcements to all Fellows</h2>
      <AnnouncementsList
        loading={loading}
        error={error}
        data={data?.announcements}
      />
    </Layout>
  );
}
