import styled from "styled-components";

export const Container = styled.div`
  padding: 0 10px;
  display: flex;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 768px) {
    padding-top: 68px !important;
  }

  & * {
    display: block;
  }

  & a {
    width: fit-content;
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
