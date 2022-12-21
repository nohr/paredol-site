import styled from "styled-components";

export const Container = styled.div`
  padding: 0 10px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    padding-top: 68px !important;
  }

  @media screen and (max-width: 768px) {
    padding: 10px !important;
    justify-content: center;
  }

  & * {
    display: block;
  }

  & a {
    width: fit-content;
  }

  & h1 {
    white-space: nowrap;
    height: min-content;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  & .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    margin: 0;
    row-gap: 5px;

    & * {
      margin: 0 !important;
    }
  }

  * pre {
    white-space: normal;
  }
`;
