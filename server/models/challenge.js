import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  level: { type: String, required: true },
  code: {
    function_name: { type: String, required: true },
    code_text: [
      {
        language: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    inputs: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  },
  tests: [
    {
      weight: { type: Number, required: true },
      inputs: [
        {
          name: { type: String, required: true },
          value: { type: mongoose.Schema.Types.Mixed, required: true },
        },
      ],
      output: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
  solvedBy: [{ type: String }], 
  solvedAt: { type: Date }, 
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;