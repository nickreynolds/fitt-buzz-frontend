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

const weights = {
  name: "Standard Pounds",
  increments: [
    {
      name: "add_quarter_pound",
      resistance: .25,
      fontWeight: "200",
      fontSize: "10px",
    },
    {
      name: "add_pound",
      resistance: 1,
      fontWeight: "400",
      fontSize: "16px",
    },
    {
      name: "add_five_pounds",
      resistance: 5,
      fontWeight: "600",
      fontSize: "20px",
    }
  ],
  decrements: [
    {
      name: "add_quarter_pound",
      resistance: -.25,
      fontWeight: "200",
      fontSize: "10px",
    },
    {
      name: "add_pound",
      resistance: -1,
      fontWeight: "400",
      fontSize: "16px",
    },
    {
      name: "add_five_pounds",
      resistance: -5,
      fontWeight: "600",
      fontSize: "20px",
    },
  ]
   
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const WeightSelectionContainer = styled.div`
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

const WeightContainer = styled.span`
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

function StandardWeightGroupComponent({weightValue, onWeightChange}) {
  console.log("weightValue: ", weightValue);
  console.log("isNaN(weightValue): ", isNaN(weightValue) );

  // let weight = isNaN(weightValue) ? 0 : weightValue;
 
  const [weight, setWeight] = useState(isNaN(weightValue) ? 0 : weightValue);
  const onChange = (delta) => {
    let newWeight = weight + delta;
    if (newWeight < 0) {
      newWeight = 0;
    }
    setWeight(newWeight)
    onWeightChange(newWeight);
  }

  console.log("weight: ", weight);

  return (
    <GroupContainer>
      <WeightSelectionContainer>
        {weights.increments.map((increment) => 
          <WeightContainer color="green" fontSize={increment.fontSize} fontWeight={increment.fontWeight} onClick={() => onChange(increment.resistance)}>{"+" + increment.resistance}</WeightContainer>
        )}
      </WeightSelectionContainer>
      <ValueContainer>
        {weight}
      </ValueContainer>
      <WeightSelectionContainer>
      {weights.decrements.map((decrement) => 
          <WeightContainer color="red" fontSize={decrement.fontSize} fontWeight={decrement.fontWeight} onClick={() => onChange(decrement.resistance)}>{"-" + decrement.resistance}</WeightContainer>
          )}
      </WeightSelectionContainer>
    </GroupContainer>
  );
}

StandardWeightGroupComponent.propTypes = {};

export default memo(StandardWeightGroupComponent);
