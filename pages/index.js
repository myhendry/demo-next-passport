import React from "react";

import Head from "next/head";
import axios from "axios";

import Layout from "../components/layout";

const Index = ({ todos }) => {
  return (
    <Layout>
      <Head>
        <title>NextJs Auth-Passport</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="max-w-sm border border-solid border-teal-700 rounded p-3 m-2 shadow-outline-gray">
        {todos &&
          todos.map((t) => (
            <div key={t._id} className="bg-teal-500 rounded p-2 my-2">
              <p className="text-white">{t.title}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get("/api/secure");
  const todos = res.data;
  return { props: { todos } };
};

export default Index;
