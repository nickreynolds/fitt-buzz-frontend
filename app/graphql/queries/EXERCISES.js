import gql from '@apollo/client';

export default gql`
  query EXERCISES {
    exercises {
      name
      id
      description
      format {
        name
      }
    }
  }
`;
