import { useId } from "react";

interface SearchFormProps {
  handleSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchForm({
  handleSearch,
  isLoading,
}: SearchFormProps) {
  const uniqId = useId();

  const handleSubmit = (formData: FormData) => {
    const searchQuery = formData.get("searchrequest") as string;
    handleSearch(searchQuery);
  };

  return (
    <>
      <form action={handleSubmit}>
        <label htmlFor={uniqId}>Search items</label>
        <input type="text" name="searchrequest" id={uniqId} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching" : "Search"}
        </button>
      </form>
    </>
  );
}
