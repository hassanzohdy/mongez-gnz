import React from "react";

export type UsersPageProps = {
  children: React.ReactNode;
};

function _UsersPage(props: UsersPageProps) {
  return (
    <>
      <h1>UsersPage</h1>
    </>
  );
}

const UsersPage = React.memo(_UsersPage);
export default UsersPage;
