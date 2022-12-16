import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root{
        --panelWidth: 270px;
        --panelHeight: 270px;
        --panelPadding: 6px 42.5px;
        --headOffset: 10px;
        --edge: 20px;
        --blur: 7px;
        --transition:0.1s;
    }

    html, body {
        height: 100vh;
        padding: 0;
        margin: 0;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: ${({ theme }) => theme.ui.secondary};
        background-color: ${({ theme }) => theme.ui.background};
        pointer-events: none;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
    
        *::selection{
            color:  #EBEBEB;
            background-color:  ${({ theme }) => theme.ui.hover};
        }
    *{
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-decoration: none;
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        /* filter:contrast(1.1) ; */
        animation-delay: 0s;

        ::-webkit-scrollbar {
             -webkit-appearance: none;
            width: 5px;
            display: flex;
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${({ theme }) => theme.ui.secondary};
            border-radius: 4px;
            /* transition: 0.3s; */
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: ${({ theme }) => theme.ui.secondary};
            box-shadow: 0 0 0 1px ${({ theme }) => theme.ui.secondary};
            -webkit-box-shadow: 0 0 0 1px ${({ theme }) => theme.ui.secondary};
            -moz-box-shadow: 0 0 0 1px ${({ theme }) => theme.ui.secondary};
            /* transition: 0.3s; */
        }
    }

    @keyframes gugmu9vdpaw {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.gugmu9vdpaw div {
  position: absolute;
  animation: gugmu9vdpaw 0.25s linear infinite;
  width: 40px;
  height: 40px;
  top: 80px;
  left: 80px;
  border-radius: 50%;
  box-shadow: 0 1.8px 0 0 ${({ theme }) => theme.ui.secondary};
  transform-origin: 20px 20.9px;
}

.htmlSpinner {
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: none;
}

.gugmu9vdpaw {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.gugmu9vdpaw p {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  color: ${({ theme }) => theme.ui.secondary};
  text-shadow: 0 1px 1 1 ${({ theme }) => theme.ui.secondary};
  font-size: 18px;
}

`;
