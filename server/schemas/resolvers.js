const { User } = require('../models');
// const { signToken } = require('../utils/auth');

module.exports = {
    Mutation: {
        createUser: async (parent, args) => {
            try {
                return await User.create(args)
                // const user = await User.create(args);
                // const token = signToken(user);
                // return { user, token };
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) { throw new Error(error); }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {throw new Error(error);}

            return user;
            // const token = signToken(user);
            // return { token, user };
        },
        saveBook: async (parent, { user, bookSchema}, context) => {
            return User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: bookSchema}},
                { new: true, runValidators: true }
            )
        }
    },
    Query: {
        hello: async () => {
            return 'hello'
        }
    }
}