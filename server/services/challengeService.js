import Challenge from '../models/challenge.js';

export const createChallenge = async (challengeData) => {
  const { title, category, description, level, code, tests } = challengeData;

  // Validate required fields
  if (!title || !category || !description || !level || !code || !tests) {
    throw new Error('All fields are required');
  }

  // Create and save the challenge
  const newChallenge = new Challenge({
    title,
    category,
    description,
    level,
    code,
    tests,
  });

  await newChallenge.save();

  return { message: 'Challenge created successfully', challenge: newChallenge };
};