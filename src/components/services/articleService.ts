// import axios from "axios";
// import type { Article } from "../types/article";

// interface ArticleHttpResponce {
//   hits: Article[];
//   nbPages: number;
// }

// export const fetchArticles = async (topic: string, page: number) => {
//   const responce = await axios.get<ArticleHttpResponce>(
//     "https://hn.algolia.com/api/v1/search",
//     {
//       params: {
//         query: topic,
//         page,
//       },
//     },
//   );
//   return responce.data;
// };

import axios from "axios";
import type { Article } from "../types/article";

interface ArticleHttpResponce {
  hits: Article[];
  nbPages: number;
  page: number;
}

export const fetchArticles = async (topic: string, page: number) => {
  const responce = await axios.get<ArticleHttpResponce>(
    "https://hn.algolia.com/api/v1/search",
    {
      params: {
        query: topic,
        page,
        hitsPerPage: 10,
      },
    },
  );
  return responce.data;
};
