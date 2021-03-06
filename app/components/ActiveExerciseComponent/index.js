/**
 *
 * ActiveExerciseComponent
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery, gql, useMutation } from '@apollo/client';

import { FormattedMessage } from 'react-intl';
import { colors } from '../../utils/constants';
import messages from './messages';

import ADD_EXERCISE_RECORDING from '../../graphql/mutations/AddExerciseRecording';
import WeightMeasurementComponent from '../WeightMeasurementComponent';
import RepsMeasurementComponent from '../RepsMeasurementComponent';
// import ROUTINE_REVISION_RECORDING from "../../graphql/queries/RoutineRevisionRecording";
const ROUTINE_REVISION_RECORDING = gql`
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

const ActiveExerciseContainer = styled.div`
  background-color: ${colors.tertiaryBackground};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  margin: 4px 4px 4px 4px;
  padding: 4px 4px 4px 4px;
  border: none;
  border-radius: 4px;
`;

const ExerciseName = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const MeasurablesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const WeightInput = styled.input``;

const RepsInput = styled.input``;

const AddExerciseRecordingButton = styled.button`
  width: 100%;
`;

const MeasurableDiv = styled.div``;

function ActiveExerciseComponent({
  exercise,
  setGroupRecording,
  setGroup,
  routineRevisionRecordingId,
  previousExerciseRecording
}) {
  const startingInputs = new Array(exercise.format.measurables.length);
  console.log("ACTIVE EXERCISE PREVIOUS EXERCISE RECORDING: ", previousExerciseRecording);
  exercise.format.measurables.forEach((measurable, i) => {
    let startingValue = '0';
    if (measurable.name === 'resistance' || measurable.name === 'assistance') {
      startingValue = '0@lbs@standard';
    }

    if (previousExerciseRecording) {
      previousExerciseRecording.measurableRecordings.forEach((measRec) => {
        if (measRec.measurable.id == measurable.id) {
          startingValue = measRec.value;
        }
      })
    }

    startingInputs[i] = { value: startingValue, measurableID: measurable.id };
  });

  const [measurableInputs, setMeasurableInputs] = useState(startingInputs);
  const [addExerciseRecording, { data }] = useMutation(ADD_EXERCISE_RECORDING);
  console.log("measurableInputs[i].value.split('@'): ", measurableInputs[1].value.split('@'))
  return (
    <ActiveExerciseContainer>
      <ExerciseName>{exercise.name}</ExerciseName>
      <Description>{exercise.description}</Description>
      <MeasurablesContainer>
        {exercise.format.measurables.map((measurable, i) => {
          if (measurable.name === 'resistance') {
            return (
              <MeasurableDiv key="resistance">
                <WeightMeasurementComponent 
                  weightValue={measurableInputs[i].value.split('@')[0]}
                  onWeightChange={weight => {
                    console.log("on weight change!")
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = `${weight}@${
                      newMeasurableInputs[i].value.split('@')[1]
                    }@${newMeasurableInputs[i].value.split('@')[2] || "standard"}`;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                  weightTypeValue={measurableInputs[i].value.split('@')[2] || "standard"}
                  onWeightTypeChange={e => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = `${
                      newMeasurableInputs[i].value.split('@')[0]
                    }@${newMeasurableInputs[i].value.split('@')[1]}@${e}`;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                  unitsValue={measurableInputs[i].value.split('@')[1]}
                  onUnitsChange={e => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = `${
                      newMeasurableInputs[i].value.split('@')[0]
                    }@${e.target.value}@${newMeasurableInputs[i].value.split('@')[2] || "standard"}`;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                />
              </MeasurableDiv>
            );
          }
          if (measurable.name === 'assistance') {
            return (
              <MeasurableDiv key="assistance">
                weight:
                <WeightInput
                  key={`${i}0`}
                  max="0"
                  type="number"
                  value={measurableInputs[i].value.split('@')[0]}
                  onChange={e => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = `${e.target.value}@${
                      newMeasurableInputs[i].value.split('@')[1]
                    }`;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                />
                <WeightInput
                  key={`${i}1`}
                  value={measurableInputs[i].value.split('@')[1]}
                  onChange={e => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = `${
                      newMeasurableInputs[i].value.split('@')[0]
                    }@${e.target.value}`;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                />
              </MeasurableDiv>
            );
          }
          if (measurable.name === 'reps') {
            return (
              <MeasurableDiv key="reps">
                <RepsMeasurementComponent
                  key={`${i}0`}
                  onRepsChange={reps => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = reps + "";
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                  repsValue={parseInt(measurableInputs[i].value)}
                />
              </MeasurableDiv>
            );
          }
          if (measurable.name === 'time') {
            return (
              <MeasurableDiv key="time">
                time:
                <RepsInput
                  key={`${i}0`}
                  min="0"
                  type="number"
                  onChange={e => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = e.target.value;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                  value={measurableInputs[i].value}
                />
              </MeasurableDiv>
            );
          }
          if (measurable.name === 'extension') {
            return (
              <MeasurableDiv key="extension">
                extension:
                <RepsInput
                  key={`${i}0`}
                  min="0"
                  type="number"
                  onChange={e => {
                    const newMeasurableInputs = measurableInputs;
                    newMeasurableInputs[i].value = e.target.value;
                    setMeasurableInputs(_ => [...newMeasurableInputs]);
                  }}
                  value={measurableInputs[i].value}
                />
              </MeasurableDiv>
            );
          }

          return <>Unknown</>;
        })}
      </MeasurablesContainer>
      <AddExerciseRecordingButton
        onClick={async e => {
          const setGroupId = setGroup.id;
          const setGroupRecordingId = setGroupRecording
            ? setGroupRecording.id
            : '';
          const exerciseRecordingInput = {
            exerciseID: exercise.id,
            measurableRecordings: measurableInputs,
          };
          // console.log("exerciseRecordingInput: ", exerciseRecordingInput);
          const result = await addExerciseRecording({
            variables: {
              routineRevisionRecordingId,
              setGroupId,
              setGroupRecordingId,
              exerciseRecordingInput,
            },
            refetchQueries: [
              {
                query: ROUTINE_REVISION_RECORDING,
                variables: { id: routineRevisionRecordingId },
              },
            ],
          });
          console.log('result: ', result);
        }}
      >
        Record
      </AddExerciseRecordingButton>
    </ActiveExerciseContainer>
  );
}

ActiveExerciseComponent.propTypes = {};

export default memo(ActiveExerciseComponent);
