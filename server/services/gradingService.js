import axios from 'axios';
import Challenge from '../models/challenge.js';
import User from '../models/user.js';

const CODE_RUNNER_URL = 'http://code-runner-service-url.com/grade'; // Replace with the actual URL

export const gradeSubmission = async (submissionData, userId) => {
  const { challengeId, code, lang } = submissionData;

  // Fetch the challenge
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) {
    throw new Error('Challenge not found');
  }

  // Check if the challenge is already solved by the user
  if (challenge.solvedBy.includes(userId)) {
    throw new Error('Challenge already solved');
  }

  // Prepare the payload for the code runner
  const payload = {
    code,
    lang,
    tests: challenge.tests.map((test) => ({
      inputs: test.inputs,
      output: test.output,
    })),
  };

  // Send the payload to the code runner
  let response;
  try {
    response = await axios.post(CODE_RUNNER_URL, payload);
  } catch (err) {
    console.error('Error communicating with the code runner service:', err);
    throw new Error('Failed to communicate with the code runner service');
  }

  const { passed, results } = response.data;

  // If tests fail, return a failure response
  if (!passed) {
    return { success: false, message: 'Submission failed. Tests did not pass.' };
  }

  // Calculate the score
  const score = challenge.tests.reduce((total, test, index) => {
    return total + test.weight * 100 * (results[index].passed ? 1 : 0);
  }, 0);

  // Update the user's total score
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.score += score;
  await user.save();

  // Mark the challenge as solved
  challenge.solvedBy.push(userId);
  await challenge.save();

  return { success: true, message: 'Submission passed!', score };
};