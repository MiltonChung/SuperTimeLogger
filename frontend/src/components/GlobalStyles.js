import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,.study-modal {
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: darkgray;
      border-radius: 40px;
    }
    &::-webkit-scrollbar-track {
		background: transparent;
	  }
  }
  body {
    font-family: 'Lato', sans-serif;
    min-height: 100vh;
    min-width: 100vw;
    /* background: linear-gradient(180deg, #59AFFF 0%, #5B00F0 100%); */
    background: url('../../background.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  #root {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
		border-radius: 5px;
		color: white;
		border: none;
		outline: none;
		cursor: pointer;
		transition: all 0.3s;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  }

  // STYLES FOR FORMS IN MODALS
  .study-modal {
		position: absolute;
		top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: fit-content;
    background: rgba(255, 255, 255, 0.65);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(9.5px);
    -webkit-backdrop-filter: blur(9.5px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    padding: 2rem;
    border-radius: 10px;
    outline: none;
    overflow-y: auto;
    .form-error-msg {
        margin-left: 5px;
        text-align: left;
        small {
          font-size: 13px;
          color: red;
        }
      }
	}
  .login-modal {
    form {
      display: flex;
      flex-direction: column;

      h3 {
        font-size: 24px;
      }
      img {
        width: 55%;
        justify-self: center;
        align-self: center;
      }
      
    }
	}
  .signup-modal {
    height: 559px;
    .show-password {
      display: flex;
      align-items: center;
      margin-top: 5px;

      input[type='checkbox'] {
        -ms-transform: scale(2); /* IE */
        -moz-transform: scale(2); /* FF */
        -webkit-transform: scale(2); /* Safari and Chrome */
        -o-transform: scale(2); /* Opera */
        transform: scale(1.05);
        margin-right: 5px;
      }
      label {
        margin: 0;
        font-size: 13px;
      }
    }
  }
  .edit-profile-modal {
    height: 590px !important;
  }
  .study-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    box-shadow: 5px 5px 10px rgba(0,0,0,0.8);
  }
  .modal-buttons {
    display: flex;
    justify-content: flex-end;
    height: fit-content;
    margin-top: 1rem;

    button[type="submit"] {
      padding: 0.5rem 1rem;
      background: #59afff;
      margin-bottom: 0.6rem;
      width: 100px;
      cursor: pointer;
      font-size: 16px;
      outline: none;
      border: none;
      border-radius: 5px;
      color: white;
      transition: all 0.3s;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
      margin-right: 1rem;
    }
    button[type="submit"]:hover {
      background: #488ccc;
    }
    button {
      padding: 0.5rem 1rem;
      background: #777777;
      margin-bottom: 0.6rem;
      width: 100px;
      font-size: 16px;
    }
    button:hover {
      background: #535353;
    }
  }
  .form-row {
		display: flex;
		flex-direction: column;
    margin-top: .4rem;
		label {
			margin-top: 0.5rem;
			font-size: 15px;
			margin-bottom: 2px;
		}
    input[type="text"]::placeholder,
    input[type="password"]::placeholder,
    input[type="date"]::placeholder,
    input[type="number"]::placeholder,
		textarea[type="text"]::placeholder {
      color: #8a8a8a;
    }
		input[type="text"],
    input[type="password"],
    input[type="date"],
    input[type="number"],
		textarea[type="text"] {
			font-family: "Lato", sans-serif;
			padding: 7px 10px;
			width: 100%;
			background: rgba(255, 255, 255, 0.548);
			border: #9e9e9e solid 2px;
			border-radius: 5px;
			outline: none;
      font-size: 15px;
		}
		input[type="text"]:focus,
    input[type="password"]:focus,
    input[type="date"]:focus,
    input[type="number"]:focus,
		textarea[type="text"]:focus {
			border: #3d3d3d solid 2px;
		}
		textarea[type="text"] {
			max-width: 100%;
		}
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type=number] {
      -moz-appearance: textfield;
      background: rgba(255, 255, 255, 0.548);
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
      box-shadow:0 0 0 30px rgba(255, 255, 255, 0.034) inset !important;
      -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.034) inset !important;
    }
    
	}

  .home-button {
    --offset: 10px;
    --border-size: 2px;
    
    display: block;
    position: relative;
    appearance: none;
    border: 0;
    background: transparent;
    text-transform: uppercase;
    letter-spacing: .25em;
    font-weight: bold;
    border-radius: 0;
    box-shadow: inset 0 0 0 var(--border-size) currentcolor;
    transition: background .5s ease;
    
    &:hover {
      background: rgba(100, 0, 0, .03);
    }
    
    &__horizontal,
    &__vertical {
      position: absolute;
      top: var(--horizontal-offset, 0);
      right: var(--vertical-offset, 0);
      bottom: var(--horizontal-offset, 0);
      left: var(--vertical-offset, 0);
      transition: transform .8s ease;
      will-change: transform;
      
      &::before {
        content: '';
        position: absolute;
        border: inherit;
      }
    }
    
    &__horizontal {
      --vertical-offset: calc(var(--offset) * -1);
      border-top: var(--border-size) solid currentcolor;
      border-bottom: var(--border-size) solid currentcolor;
      
      &::before {
        top: calc(var(--vertical-offset) - var(--border-size));
        bottom: calc(var(--vertical-offset) - var(--border-size));
        left: calc(var(--vertical-offset) * -1);
        right: calc(var(--vertical-offset) * -1);
      }
    }
    
    &:hover &__horizontal {
      transform: scaleX(0);
    }
    
    &__vertical {
      --horizontal-offset: calc(var(--offset) * -1);
      border-left: var(--border-size) solid currentcolor;
      border-right: var(--border-size) solid currentcolor;
      
      &::before {
        top: calc(var(--horizontal-offset) * -1);
        bottom: calc(var(--horizontal-offset) * -1);
        left: calc(var(--horizontal-offset) - var(--border-size));
        right: calc(var(--horizontal-offset) - var(--border-size));
      }
    }
    
    &:hover &__vertical {
      transform: scaleY(0);
    }
  }
`;

export default GlobalStyles;
