import useSWR from "swr";
import axios from "axios";

import Layout from "../components/layout";

const fetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const Pokemon = () => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?limit=5&offset=200`,
    fetcher
  );

  if (error) return <h1>Error Loading</h1>;
  if (!data) return <h1>Loading...</h1>;
  console.log(data);
  return (
    <Layout>
      {data?.results.map((p, idx) => (
        <div key={idx}>
          <h2>{p.name}</h2>
        </div>
      ))}
    </Layout>
  );
};

export default Pokemon;
