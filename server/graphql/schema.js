import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';
import ChallengeService from '../services/ChallengeService'; // Adjust the path as needed

// Example: Challenge Type
const ChallengeType = new GraphQLObjectType({
  name: 'Challenge',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLNonNull(GraphQLString) },
    category: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    solution_rate: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    challenges: {
      type: GraphQLList(ChallengeType),
      args: { category: { type: GraphQLString } },
      resolve(parent, args, context) {
        const { user } = context;

        // Ensure the user is authenticated
        if (!user) {
          throw new Error('Access denied. Please log in.');
        }

        // Fetch challenges based on category
        return ChallengeService.getChallengesByCategory(args.category, user.id);
      },
    },
    challenge: {
      type: ChallengeType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args, context) {
        const { user } = context;

        // Ensure the user is authenticated
        if (!user) {
          throw new Error('Access denied. Please log in.');
        }

        // Fetch challenge by ID
        return ChallengeService.getChallengeById(args.id);
      },
    },
    categories: {
      type: GraphQLList(GraphQLString),
      resolve() {
        // Fetch all categories
        return ChallengeService.getAllCategories();
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});