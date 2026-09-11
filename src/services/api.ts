import axios from "axios";
import type { Article } from "./types";

axios.defaults.baseURL = "http://hn.algolia.com/api/v2";

interface SearchArticleResponse {
  hits: Article[];
}

export const searchArticles = async (query: string) => {
  const response = await axios.get<SearchArticleResponse>(
    `/search?query=${query}`,
  );
  return response.data.hits;
};
