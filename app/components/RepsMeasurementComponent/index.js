/**
 *
 * ResistanceBandsGroupComponent
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const repValues = {
  name: "Standard Reps",
  increments: [
    {
      name: "add_one",
      reps: 1,
      fontWeight: "400",
      fontSize: "16px",
    },
    {
      name: "add_five",
      reps: 5,
      fontWeight: "600",
      fontSize: "20px",
    }
  ],
  decrements: [
    {
      name: "sub_one",
      reps: -1,
      fontWeight: "400",
      fontSize: "16px",
    },
    {
      name: "sub_five",
      reps: -5,
      fontWeight: "600",
      fontSize: "20px",
    }
  ]
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const RepsSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
`;

const ValueContainer = styled.div`
  padding: 4px;
  font-size: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const RepContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  height: 30px;
  font-family: 'Roboto', sans-serif;
  color:${props => props.color};
  font-size:${props => props.fontSize};
  font-weight:${props => props.fontWeight};
  margin-right: 6px;
  padding-left: 6px;
  padding-right: 6px;
`;

const RepsTitle = styled.span`
  color: dark-green;
  font-size: 30px;
`;

function RepsMeasurementComponent({repsValue, onRepsChange}) {
  console.log("repsValue: ", repsValue);
 
  const reps = repsValue || 0;
  const onChange = (delta) => {
    let newReps = reps + delta;
    if (newReps < 0) {
      newReps = 0;
    }
    console.log("newReps: ", newReps);
    onRepsChange(newReps);
  }

  console.log("reps: ", reps);

  return (
    <GroupContainer>
      <RepsTitle>Reps</RepsTitle>
      <RepsSelectionContainer>
        {repValues.increments.map((increment) => 
          <RepContainer color="green" fontSize={increment.fontSize} fontWeight={increment.fontWeight} onClick={() => onChange(increment.reps)}>{"+" + increment.reps}</RepContainer>
        )}
      </RepsSelectionContainer>
      <ValueContainer>
        {reps}
      </ValueContainer>
      <RepsSelectionContainer>
      {repValues.decrements.map((decrement) => 
          <RepContainer color="red" fontSize={decrement.fontSize} fontWeight={decrement.fontWeight} onClick={() => onChange(decrement.reps)}>{"-" + decrement.reps}</RepContainer>
      )}
      </RepsSelectionContainer>
    </GroupContainer>
  );
}

RepsMeasurementComponent.propTypes = {};

export default memo(RepsMeasurementComponent);
