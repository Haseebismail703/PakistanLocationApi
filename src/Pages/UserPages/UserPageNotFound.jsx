import React from "react";
import { Result, Button } from "antd";

const UserPageNotFound = () => {


  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
};

export default UserPageNotFound;
