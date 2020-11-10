import { gql } from '@apollo/client';

export default gql`
mutation AddExerciseRecording(
  $routineRevisionRecordingId:String!,
  $setGroupId:String!,
  $setGroupRecordingId:String!,
  $exerciseRecordingInput:ExerciseRecordingInput!) {
    addExerciseRecording(
      routineRevisionRecordingId:$routineRevisionRecordingId,
      setGroupId:$setGroupId,
      setGroupRecordingId:$setGroupRecordingId,
      exerciseRecordingInput:$exerciseRecordingInput
    )
  }
`;
