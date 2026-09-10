import type { Article } from "../../types/article";

interface ArticlesProps {
  hits: Article[];
}

export default function Articles({ hits }: ArticlesProps) {
  return (
    <ul>
      {hits.map((hit) => (
        <li key={hit.objectID}>
          <a href={hit.url}>{hit.title}</a>
        </li>
      ))}
    </ul>
  );
}
