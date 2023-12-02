import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

export const usePostsIdSlug = routeLoader$(async requestEvent => {
  // This code runs only on the server, after every navigation
  // your logic goes here
});

export default component$(() => {
  const data = usePostsIdSlug();

  return (
    <>
      <h1>Hello, World!</h1>
    </>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(usePostsIdSlug);

  return {
    title: "PostsIdSlug",
    // other meta data goes here
  };
};
