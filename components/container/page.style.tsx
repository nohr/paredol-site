import styled from "styled-components";

export const Container = styled.div`
  padding: 0 10px;
  display: flex;
  width: 100%;
  /* height: 100%; */
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

  & #chart {
    width: 100%;
    height: 100%;
  }

  & #chart h1 {
    white-space: nowrap;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;
