"use client";
import React from "react";

export type BigProps = {
  // props go here
};
function _Big(props: BigProps) {
  return (
    <>
      <h1>Big</h1>
    </>
  );
}

const Big = React.memo(_Big);
export default Big;
