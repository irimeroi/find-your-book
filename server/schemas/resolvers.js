const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new Error;
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            try {
                // return await User.create(args)
                const user = await User.create({ username, email, password });
                const token = signToken(user);
                return { user, token };
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) { throw new Error('no user was found'); }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) { throw new Error('password is incorrect'); }

            // return user;
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                )
                return updateUser;
            }
            throw new Error("You must be logged in to save books");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) { 
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId }}},
                    { new: true }
                );
                return updatedUser;
            }
            throw new Error('You must be logged in to delete books');
        }
    }
}