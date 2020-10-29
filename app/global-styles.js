import { createGlobalStyle } from 'styled-components';
import { colors } from './utils/constants';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: ${colors.primaryBackground};
    min-height: 100%;
    min-width: 100%;
    color: ${colors.textColor};
  }
`;

export default GlobalStyle;
