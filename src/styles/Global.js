import { createGlobalStyle } from 'styled-components';
import { colors, fonts } from 'constants/styling';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Press+Start+2P&display=swap');

  body {
    background-color: ${colors.gunMetal};
    font-size: 24px;
    font-family: ${fonts.text};
    color: ${colors.white};
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyle;