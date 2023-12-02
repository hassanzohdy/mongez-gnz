import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <h1>Hello, World!</h1>
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: "contact-us",
    // other meta data goes here
  };
};
