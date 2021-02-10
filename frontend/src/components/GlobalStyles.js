import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
    }
    &::-webkit-scrollbar-track {
		background: white;
    
	}
  }
  body {
    font-family: 'Lato', sans-serif;
    min-height: 100vh;
    min-width: 100vw;
    background: linear-gradient(180deg, #59AFFF 0%, #5B00F0 100%);
  }
  #root {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
`;

export default GlobalStyles;
