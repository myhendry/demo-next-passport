import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/layout";
import { useUser } from "../../lib/hooks";

const Protected = () => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    if (!user) router.push("/signin");
  });

  return (
    <Layout>
      <h1>Protected Page</h1>
    </Layout>
  );
};

export default Protected;
