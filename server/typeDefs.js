import { gql } from 'graphql-tag';

const typeDefs = gql`
   type User{
     id: ID
     email: String!
     password: String!
   }
   type Query{
       getUsers: [User]
   }
   type Mutation{
        addUser(email:String!, password: String!):User
        updateUser(id:String!, email:String!, password: String!):User
        signIn(email: String!, password: String!): [User]!
   }
`

export default typeDefs;
