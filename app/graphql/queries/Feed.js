import gql from '@apollo/client';

export default gql`
  {
    feed {
      name
      id
      description
    }
  }
`;
