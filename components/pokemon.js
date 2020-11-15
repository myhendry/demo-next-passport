import React from "react";
import useSWR from "swr";
import axios from "axios";
import Skeleton from "react-loading-skeleton";

const fetcher = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export const Poke = () => {
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?limit=5&offset=200`,
    fetcher
  );

  if (error) return <h1>Error Loading</h1>;
  if (!data) return <Skeleton count={10} />;
  return (
    <div>
      {data?.results.map((p, idx) => (
        <div key={idx}>
          <h2>{p.name}</h2>
        </div>
      ))}
    </div>
  );
};
