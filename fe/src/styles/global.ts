import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Sora', sans-serif;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    font-size: 16px;
    color: ${props => props.theme.colors.gray[900]}
  }

  button {
    cursor: pointer;
  }

  .general-container {
    width: 100%;
    max-width: 500px;
    padding: 0 1rem;
    margin: 0 auto;
  }
`;
