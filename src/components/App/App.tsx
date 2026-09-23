// import { useWindowWidth } from "../hooks/useWindowWidth";

import React, { useState } from "react";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  // const windowWidth = useWindowWidth();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isFetching } = useFetchPosts(searchQuery);

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
    1000,
  );
  return (
    <>
      {/* <p>Current window width: {windowWidth}px</p> */}
      <input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
      {isFetching && <div>Loading posts...</div>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
