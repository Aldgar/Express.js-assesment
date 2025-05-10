import { useState } from 'react';
import { useGetChallengesQuery } from '../api/gqlApi';

const Challenges = () => {
  const [category, setCategory] = useState('');
  const { data, error, isLoading } = useGetChallengesQuery({ category });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <ul>
        {data.challenges.map((challenge) => (
          <li key={challenge.title}>
            {challenge.title} - {challenge.category} - {challenge.difficulty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenges;