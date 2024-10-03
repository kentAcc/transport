import React from "react";
import dynamic from "next/dynamic";

const UserForm = dynamic(() => import("@/components/UserForm"), {
  ssr: false,
});

const NewTruckForm = () => {
  return <UserForm />;
};

export default NewTruckForm;
