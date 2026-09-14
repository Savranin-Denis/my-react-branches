import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchCharacter = async (id: string) => {
  const respone = await axios.get(`https://swapi.info/api/people/${id}`);
  console.log(respone.data);
  return respone.data;
};

export default function App() {
  //   const [count, setCount] = useState(1);
  const [characterId, setCharacterId] = useState("");

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: characterId !== "",
  });

  const handleSearch = (formData: FormData) => {
    const id = formData.get("id") as string;
    setCharacterId(id);
  };
  return (
    <>
      <form action={handleSearch}>
        <input type="text" name="id" placeholder="Enter character ID" />
        <button type="submit">Search</button>
      </form>
      {/* <button onClick={() => setCount(count + 1)}>Get next character</button> */}
      {isLoading && <p>Loading data...</p>}
      {isError && <p>An error occurred: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}
