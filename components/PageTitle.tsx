import Head from "next/head";
import { FC } from "react";

const PageTitle: FC<{ pageTitle: string }> = ({ pageTitle = "" }) => (
  <Head>
    <title>On Deck - {pageTitle}</title>
  </Head>
);

export default PageTitle;
