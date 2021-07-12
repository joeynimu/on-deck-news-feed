import { useRouter } from "next/router";

import Layout from "components/Layout";
import ProjectCard from "components/ProjectCard";
import PageTitle from "components/PageTitle";
import { useGetProjectQuery } from "graphql-queries/generated/graphql";
import { BackButton } from "components/AnnouncementList";

export default function ProjectPage() {
  const {
    query: { id = "0" },
  } = useRouter();

  const { data, error, loading } = useGetProjectQuery({
    variables: {
      id: Number(id),
    },
  });

  const project = data?.project;

  if (!project || loading || error) {
    return null;
  }

  return (
    <Layout>
      <PageTitle pageTitle={project.name} />
      <BackButton onClick={() => window.history.back()}>Go Back</BackButton>
      <ProjectCard project={project} />
    </Layout>
  );
}
