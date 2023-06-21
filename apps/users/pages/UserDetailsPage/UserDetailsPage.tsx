import React from "react";

export type UserDetailsPageProps = {
  children: React.ReactNode;
};

function _UserDetailsPage(props: UserDetailsPageProps) {
  return (
    <>
      <h1>UserDetailsPage</h1>
    </>
  );
}

const UserDetailsPage = React.memo(_UserDetailsPage);
export default UserDetailsPage;
