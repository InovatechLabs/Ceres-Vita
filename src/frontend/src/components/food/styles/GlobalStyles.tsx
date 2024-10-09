import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-image: url('https://i.imgur.com/vNU0cEN.png'); 
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
  }
`;

export default GlobalStyles;