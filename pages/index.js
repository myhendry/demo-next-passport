import Head from "next/head";

import Layout from "../components/layout";
import { useUser } from "../lib/hooks";

const Index = () => {
  const [user] = useUser();

  return (
    <Layout>
      <Head>
        <title>NextJs Auth-Passport</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1 className="text-red-600">Hello World</h1>
      {user && <p>Hello {user.name}</p>}
    </Layout>
  );
};

export default Index;
