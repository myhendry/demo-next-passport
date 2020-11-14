import Head from "next/head";

import Layout from "../components/layout";
import { useUser } from "../lib/hooks";

export default function Home() {
  const [user] = useUser();
  console.log(user);

  return (
    <Layout>
      <Head>
        <title>NextJs Auth-Passport</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Hello World</h1>
      {user && <p>Hello {user.name}</p>}
    </Layout>
  );
}
