import Joi from 'joi';
import Challenge from '../models/challenge.js';
import { createChallenge as createChallengeService } from '../services/challengeService.js';
import { gradeSubmission } from '../services/gradingService.js';

export const createChallenge = async (req, res) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    level: Joi.string().required(),
    code: Joi.object({
      function_name: Joi.string().required(),
      code_text: Joi.array()
        .items(
          Joi.object({
            language: Joi.string().required(),
            text: Joi.string().required(),
          })
        )
        .required(),
      inputs: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
          })
        )
        .required(),
    }).required(),
    tests: Joi.array()
      .items(
        Joi.object({
          weight: Joi.number().required(),
          inputs: Joi.array()
            .items(
              Joi.object({
                name: Joi.string().required(),
                value: Joi.required(),
              })
            )
            .required(),
          output: Joi.required(),
        })
      )
      .required(),
  });

  // Validate request data
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Create and save the challenge
    const challenge = new Challenge(req.body);
    await challenge.save();

    res.status(201).json({ message: 'Challenge created successfully', challenge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getAllChallenges = async (req, res) => {
  const { category } = req.query; 
  try {
    const filter = category ? { category } : {};
    const challenges = await Challenge.find(filter);
    res.status(200).json(challenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getChallengeById = async (req, res) => {
  const { id } = req.params;

  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

    res.status(200).json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Challenge.distinct('category');
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const submitCode = async (req, res) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    lang: Joi.string().valid('py', 'js').required(), 
    code: Joi.string().required(), 
    challenge_id: Joi.string().required(),
  });

  // Validate request data
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { lang, code, challenge_id } = req.body;

  try {
    // Find the challenge by ID
    const challenge = await Challenge.findById(challenge_id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

  
    const isCorrect = simulateGrading(challenge, lang, code);

    if (isCorrect) {
      res.status(200).json({ message: 'Submission is correct!' });
    } else {
      res.status(200).json({ message: 'Submission is incorrect. Try again!' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const simulateGrading = () => {
  return true;
};

export const createChallengeController = async (req, res) => {
  try {
    const response = await createChallengeService(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const submitUserCode = async (req, res) => {
  const userId = req.user.id; // Extracted from the `authorize` middleware
  const submissionData = req.body;

  try {
    const response = await gradeSubmission(submissionData, userId);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};