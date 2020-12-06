/**
 *
 * ResistanceBandsGroupComponent
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const resistanceBands = {
  name: "Nick's Unique Black Mountain Products",
  bands: [
    {
      name: "thin_yellow",
      minResistance: "2",
      maxResistance: "4",
      hex: "#f2fa55",
    },
    {
      name: "blue",
      minResistance: "4",
      maxResistance: "6",
      hex: "#008eb5",
    },
    {
      name: "green",
      minResistance: "10",
      maxResistance: "12",
      hex: "#0b8027",
    },
    {
      name: "black",
      minResistance: "15",
      maxResistance: "20",
      hex: "#000000",
    },
    {
      name: "red",
      minResistance: "25",
      maxResistance: "30",
      hex: "#ff0000",
    },
    {
      name: "orange",
      minResistance: "35",
      maxResistance: "40",
      hex: "#ff8000",
    },
    {
      name: "atomic",
      minResistance: "70",
      maxResistance: "75",
      hex: "#00ff6a",
    }
  ]
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const BandSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
`;

const IncrementContainer = styled.div`
  padding: 4px;
  font-size: 30px;
`;

const DecrementContainer = styled.div`
  padding: 4px;
  font-size: 30px;
`;

const BandContainer = styled.div`
  width: 4px;
  height: 18px;
  background-color:${props => props.color}
`;

const BandValues = styled.div`
  font-size: 10px;
`;

const NumBands = styled.div`
  font-size: 14px;
`;

function ResistanceBandsGroupComponent({weightValue, onWeightChange}) {
  let weights = new Array(resistanceBands.bands.length);
  for (var i = 0; i < weights.length; i++) {
    weights[i] = 0;
  }
  if (weightValue) {
    const splitWeight = weightValue.split("-");
    if (splitWeight.length === weights.length) {
      splitWeight.map((w, i) => {
        weights[i] = parseInt(w);
      })
    }
  }

  const onChange = (delta, i) => {
    weights[i] += delta;
    if (weights[i] < 0) {
      weights[i] = 0;
    }
    onWeightChange(weights.join("-"));
  }

  return (
    <GroupContainer>
      {resistanceBands.bands.map((band, i) => {
        return (
          <BandSelectionContainer>
            <IncrementContainer onClick={() => onChange(1, i)}>+</IncrementContainer>
        <BandValues>{`${band.minResistance}-${band.maxResistance}`}</BandValues>
            <BandContainer color={band.hex}/>
              <NumBands>{weights[i]}</NumBands>
            <DecrementContainer onClick={() => onChange(-1, i)}>-</DecrementContainer>
          </BandSelectionContainer>
        )
      })}
    </GroupContainer>
  );
}

ResistanceBandsGroupComponent.propTypes = {};

export default memo(ResistanceBandsGroupComponent);
