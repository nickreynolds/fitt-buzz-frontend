/**
 *
 * WeightMeasurementComponent
 * Should maybe be renamed ForceMeasuramentComponent?
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ResistanceBandsGroupComponent from "../ResistanceBandsGroupComponent";
import StandardWeightGroupComponent from '../StandardWeightGroupComponent';

const ToggleWeightTypeButton = styled.button`
  box-shadow: 0px 1px 0px 0px #f0f7fa;
  background:${props => props.hover ? "linear-gradient(to bottom, #33bdef 5%, #019ad2 100%)" : "linear-gradient(to bottom, #019ad2 5%, #33bdef 100%)"}
  background-color:#33bdef;
  border-radius:6px;
  border:1px solid #057fd0;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:15px;
  font-weight:bold;
  padding:6px 6px;
  text-decoration:none;
  position: relative;
  right: 5px;
  top: 5px;
`;

const WeightTitle = styled.span`
  color: dark-green;
  font-size: 30px;
`;

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justiy-content: flex-end;
`;

const InnerContainer = styled.div`
display: flex;
flex-direction: row;
`;

const WeightInput = styled.input``;

const STANDARD = "standard";
const RESISTANCE_BANDS = "resistancebands";

function WeightMeasurementComponent({weightValue, unitsValue, weightTypeValue, onWeightChange, onUnitsChange, onWeightTypeChange}) {
  console.log("WeightMeasurementComponent - weightTypeValue: ", weightTypeValue);
  return (
    <OuterContainer>
              <ToggleWeightTypeButton onClick={() => {
          if (weightTypeValue === STANDARD) {
            onWeightTypeChange(RESISTANCE_BANDS)
          } else {
            onWeightTypeChange(STANDARD)
          }
        }}>T</ToggleWeightTypeButton>
      <TopContainer>

        <WeightTitle>Weight</WeightTitle>
      </TopContainer>
      <InnerContainer>
        {getInnerComponent()}
      </InnerContainer>
    </OuterContainer>
  )
  function getInnerComponent() {
  if (weightTypeValue === STANDARD) {
    return <StandardWeightGroupComponent weightValue={isNaN(weightValue) ? 0 : weightValue} onWeightChange={onWeightChange} />;
    } else if (weightTypeValue === RESISTANCE_BANDS)
    return (
     <ResistanceBandsGroupComponent weightValue={weightValue} onWeightChange={onWeightChange}/>
    );
  }
}

WeightMeasurementComponent.propTypes = {};

export default memo(WeightMeasurementComponent);
