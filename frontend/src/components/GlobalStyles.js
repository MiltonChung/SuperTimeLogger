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
  .login-modal {
		position: absolute;
		top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    background: white;
    padding: 3rem;
    border-radius: 10px;
	}
  .login-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    box-shadow: 5px 5px 10px rgba(0,0,0,0.8);
  }
`;

export default GlobalStyles;
