import React from "react";

const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json)
    .then((json) => console.log(json));

  return <div>all trucks</div>;
};

export default page;
