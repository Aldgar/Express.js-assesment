import { useGetCategoriesQuery } from '../api/gqlApi';

const Categories = () => {
  const { data, error, isLoading } = useGetCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.categories.map((category) => (
        <li key={category}>{category}</li>
      ))}
    </ul>
  );
};

export default Categories;