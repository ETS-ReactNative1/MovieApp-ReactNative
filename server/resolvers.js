import Movie from "./models/User.js";

const resolvers = {
    Query: {
        getUsers: async () => {
            const users = await Movie.find()
            return users
        }
    },
    Mutation:{
        addUser: async (parent, args) => {
            const newUser = new Movie({email:args.email,password:args.password})
            await newUser.save();
            return newUser;
        },
        updateUser: async (root, args) => {
            const { id, email, password } = args;
            const updatedUser = {};
            if (email !== undefined) {
                updatedUser.email = email
            }
            if (password !== undefined) {
                updatedUser.password = password
            }
            const user = await Movie.findByIdAndUpdate(
            id,
            updatedUser ,
            { new: true }
            )
            return user;
        },
        signIn: async ( parent, args ) => {
            const { email, password } = args;
            const user = await Movie.find({ email: email, password: password});
            if (!user) {
              throw new UserInputError(
                'No user found with this login credentials.',
              );
            }
            return user;
          },
    }
}

export default resolvers;