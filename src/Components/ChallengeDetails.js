import { useGetChallengeByIdQuery } from '../api/gqlApi';

const ChallengeDetails = ({ id }) => {
  const { data, error, isLoading } = useGetChallengeByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { description, code, submission, tests } = data.challenge;

  return (
    <div>
      <h1>Challenge Details</h1>
      <p>{description}</p>
      <pre>{code}</pre>
      <p>Submission: {submission}</p>
      <ul>
        {tests.map((test, index) => (
          <li key={index}>{test}</li>
        ))}
      </ul>
    </div>
  );
};

import PropTypes from 'prop-types';

ChallengeDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ChallengeDetails;