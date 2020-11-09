import { gql } from '@apollo/client';

export default gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
