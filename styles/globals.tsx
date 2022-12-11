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
        color: ${({ theme }) => theme.colors.secondary};
        background-color: ${({ theme }) => theme.colors.background};
    }

    a {
        color: inherit;
        text-decoration: none;
    }
    
        *::selection{
            color:  #EBEBEB;
            background-color:  ${({ theme }) => theme.colors.hover};
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
            background-color: ${({ theme }) => theme.colors.secondary};
            border-radius: 4px;
            /* transition: 0.3s; */
        }
        ::-webkit-scrollbar-thumb:hover {
            background-color: ${({ theme }) => theme.colors.secondary};
            box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
            -webkit-box-shadow: 0 0 0 1px ${({ theme }) =>
              theme.colors.secondary};
            -moz-box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
            /* transition: 0.3s; */
        }
    }


`;
