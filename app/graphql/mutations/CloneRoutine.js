import { gql } from '@apollo/client';

export default gql`
  mutation CloneRoutineAtRevision($routineId: String!, $revisionId: String!) {
    cloneRoutineAtRevision(routineId: $routineId, revisionId: $revisionId) {
      id
    }
  }
`;
