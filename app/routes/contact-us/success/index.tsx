import { component$ } from "@builder.io/qwik";

export const useContactUsSuccess = routeLoader$(async requestEvent => {
  // This code runs only on the server, after every navigation
  // your logic goes here
});

export default component$(() => {
  const data = useContactUsSuccess();

  return (
    <>
      <h1>Hello, World!</h1>
    </>
  );
});
