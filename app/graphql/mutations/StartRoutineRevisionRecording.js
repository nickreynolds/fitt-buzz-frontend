import { gql } from '@apollo/client';

export default gql`
  mutation StartRoutineRevisionRecording(
    $routineId: String!
    $revisionId: String!
  ) {
    startRoutineRevisionRecording(
      routineId: $routineId
      revisionId: $revisionId
    )
  }
`;
