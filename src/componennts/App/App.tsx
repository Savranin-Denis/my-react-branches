// export default function App() {
//   const handleSubmit = (evt: React.SubmitEvent<HTMLFormElement>) => {
//     evt.preventDefault();
//     const form = evt.currentTarget;
//     const formData = new FormData(form);
//     const username1 = formData.get("username1") as string;
//     const username2 = formData.get("username2") as string;

// import axios from "axios";
import SearchForm from "../SearchForm/SearchForm";
import { useState } from "react";
import Articles from "../Articles/Articles";
import type { Article } from "../../types/article";
import { fetchArticles } from "../services/articleService";

// import CustomForm from "../CustomForm/CustomForm";
// import OrderForm from "../OrderForm/OrderForm";

//     const data = {
//       username1,
//       username2,
//     };
//     console.log(data);
//     form.reset();
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="username1" />
//         <input type="text" name="username2" />
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default function App() {
//   const handleOrder = (data: string) => {
//     console.log("Received order", data);
//   };

//   return (
//     <>
//       <CustomForm />
//       <OrderForm onSubmit={handleOrder} />
//     </>
//   );
// }

// interface Article {
//   objectID: string;
//   title: string;
//   url: string;
// }

// interface ArticlesHttpResponse {
//   hits: Article[];
// }

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      // const response = await axios.get<ArticlesHttpResponse>(
      //   `http://hn.algolia.com/api/v1/search?query=${topic}`,
      // );
      const data = await fetchArticles(topic);
      // setArticles(response.data.hits);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <Articles hits={articles} />}
    </>
  );
}
