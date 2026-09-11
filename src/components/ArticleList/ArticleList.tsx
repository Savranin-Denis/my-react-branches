import type { Article } from "../../services/types";

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <ul>
      {articles.map(({ author, objectID, title, url }) => (
        <li key={objectID}>
          <a href={url}>{title}</a>
          <p>Author: {author}</p>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
