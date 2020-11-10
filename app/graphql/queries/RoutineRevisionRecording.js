import gql from '@apollo/client';

export default gql`
  query ROUTINE_REVISION_RECORDING($id: String!) {
    routineRevisionRecording(id: $id) {
      id
      createdAt
      routineRevision {
        id
        routine {
          id
          name
        }
        setGroupPlacements {
          setGroup {
            id
            exercises {
              id
              name
              description
              format {
                id
                name
                measurables {
                  id
                  name
                }
              }
            }
            defaultNumSets
          }
        }
      }
      completedSetGroups
      setGroupRecordings {
        id
        setGroup {
          id
          exercises {
            id
            name
            description
            format {
              id
              name
              measurables {
                  id
                  name
                }
            }
          }
          defaultNumSets
        }
        completedSets
        setRecordings {
          id
          completedExercises
          exerciseRecordings {
            id
            exercise {
              id
              name
              format {
                id
                name
              }
            }
            measurableRecordings {
              id
              measurable {
                id
                name
              }
              value
            }
          }
        }
      }
    }
  }
`;
