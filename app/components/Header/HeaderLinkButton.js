//import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../utils/constants';

export default styled.button`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: ${colors.popElement1};

  &:active {
    background: ${colors.popElement1};
    color: #fff;
  }
`;
