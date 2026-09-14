// import { useState } from "react";
// import Pagination from "../Pagination/Pagination";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { fetchArticles } from "../services/articleService";
// import SearchForm from "../SearchForm/SearchForm";
// import ArticleList from "../ArticleList/ArticleList";

// export default function App() {
//   const [topic, setTopic] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);

//   const { isLoading, isError, data, isSuccess } = useQuery({
//     queryKey: ["articles", topic, currentPage],
//     queryFn: () => fetchArticles(topic, currentPage),
//     enabled: topic !== "",
//     placeholderData: keepPreviousData,
//   });

//   const totalpages = data?.nbPages ?? 0;

//   const handleSearch = async (newTopic: string) => {
//     setTopic(newTopic);
//     setCurrentPage(1);
//   };
//   return (
//     <>
//       <SearchForm onSubmit={handleSearch} />
//       {isSuccess && totalpages && (
//         <Pagination
//           totalpages={totalpages}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       )}
//       {isLoading && <p>Loading data, please wait...</p>}
//       {isError && <p>Whoops, something went wrong! Please try again!</p>}
//       {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
//     </>
//   );
// }

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services/articleService";
import SearchForm from "../SearchForm/SearchForm";
import ArticleList from "../ArticleList/ArticleList";

export default function App() {
  const [topic, setTopic] = useState("");

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ["articles", topic],
    queryFn: ({ queryKey, pageParam }) => {
      const [, currentTopic] = queryKey;
      return fetchArticles(currentTopic, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastResponce) => {
      const nextPage = lastResponce.page + 1;
      return nextPage < lastResponce.nbPages ? nextPage : undefined;
    },
    enabled: topic !== "",
    select: (data) => {
      return {
        ...data,
        articles: data.pages.flatMap((page) => page.hits),
      };
    },
  });

  console.log(data);

  const handleSearch = (newTopic: string) => {
    setTopic(newTopic);
  };

  const articles = data?.articles ?? [];
  const hasArticles = articles.length > 0;
  const showNoResults = isFetched && !isError && !hasArticles;

  return (
    <>
      <SearchForm onSubmit={handleSearch} />

      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {showNoResults && <p>No articles found. Try another search.</p>}
      {hasArticles && (
        <>
          <ArticleList items={articles} />
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetching || !hasNextPage}
          >
            {isFetchingNextPage
              ? "Loading more"
              : hasNextPage
                ? "Load more"
                : "Nothing more to load"}
          </button>
        </>
      )}
    </>
  );
}
