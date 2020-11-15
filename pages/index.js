import Head from "next/head";

import Layout from "../components/layout";

const Index = ({ todos }) => {
  return (
    <Layout>
      <Head>
        <title>NextJs Auth-Passport</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div>
        {todos &&
          todos.map((t) => (
            <div key={t._id} className="bg-teal-500 rounded p-5 my-2">
              <p>{t.title}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/secure", {
    method: "GET",
  });
  const todos = await res.json();
  return { props: { todos } };
};

export default Index;
