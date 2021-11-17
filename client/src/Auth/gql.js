import gql from 'graphql-tag';

export const ADD_USER= gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      email
      password
    }
  }
`;

export const GET_USERS= gql`
  query GetUsers{
    getUsers{
      email
      password
    }
  }
`;

export const SIGN_IN = gql`
  mutation SingIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      password
  }
}
`