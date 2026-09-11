import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";
import ArticleList from "../ArticleList/ArticleList";
import { searchArticles } from "../../services/api";
import type { Article } from "../../services/types";

export default function App() {
  const [hits, setHits] = useState<Article[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(false);
  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setHits([]);
      setIsLoader(true);
      const data = await searchArticles(query);
      setIsLoader(false);
      setHits(data);
    } catch {
      setError(true);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <SearchForm handleSearch={handleSearch} isLoading={isLoader} />
      {isLoader && <h2>Loading data, wait please...</h2>}
      {error && <h2>Oops, something went wrong...</h2>}
      <hr />
      {hits.length > 0 && <ArticleList articles={hits} />}
    </>
  );
}
