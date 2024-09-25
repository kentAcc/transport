import React from "react";
interface Props {
  params: { id: string };
}
const page = ({ params }: props) => {
  return <div>specific truck {params.id}</div>;
};

export default page;
