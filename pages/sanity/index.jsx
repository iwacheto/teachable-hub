import React from "react";
import { client } from "../utils/client/sanity";

const Sanity = ({ movies }) => {
  console.log(movies);
  return <div>Sanity</div>;
};

export default Sanity;

export async function getServerSideProps() {
  const movies = await client.fetch(`*[_type == 'movie']`);

  console.log("movies", movies);

  return {
    props: {
      movies,
    },
  };
}
