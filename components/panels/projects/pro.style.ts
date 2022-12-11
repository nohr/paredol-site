import styled from "styled-components";
import { state } from "../../utils/state";

// Projects
export const Project = styled.div`
  /* padding: var(--panelPadding); */
  padding-bottom: 0;
  position: absolute;
  z-index: 4800;
  left: var(--edge);
  margin: 20px 0 0 0;
  text-align: center;
  overflow: scroll !important;
  display: flex;
  align-items: ${(props) => props.align};
  justify-content: center;
  ${(props) => props.layout}
  ${(props) => props.hide}
      ${(props) => props.top}
      -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::-webkit-scrollbar {
    width: 0px;
    /* display: none; */
  }

  * .li {
    cursor: pointer;
    /* backdrop-filter: blur(10px) !important; */
    margin: 0 0 4px 0;
    width: 95%;
    transition: 0.9s !important;
  }
  p {
    cursor: pointer;
    margin: 3px auto 5px auto;
    overflow: visible;
    text-align: center;
    border: 1px solid;
    border-color: transparent transparent ${({ theme }) => theme.colors.secondary}
      transparent;
    transition: 0.9s;
    border-radius: 10px;
    text-transform: uppercase !important;
    font-size: 10px !important;
    padding: 3px 0;

    &:hover {
      transition: 0.1s;
      font-weight: 900;
      color: #ebebeb;
      background-color: ${({ theme }) => theme.colors.hover};
    }
  }

  .self,
  .client {
    display: flex !important;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    overflow-y: scroll;
    overflow-x: visible;
    padding: 2px 2px 0px 10px;
    width: 90%;

    .li {
      transition: 0.1s !important;
    }

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
      border: 1px solid;
      border-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 4px;
      transition: 0.1s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
      -webkit-box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
      -moz-box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
      transition: 0.1s;
    }
  }

  #selfhead,
  #clienthead {
    @media screen and (min-height: 1087px) and (max-height: 1300px) {
      font-size: 0.8vh !important;
    }
    @media screen and (min-height: 1300px) {
      font-size: 0.65vh !important;
    }
  }

  .self {
    padding-bottom: 0;
  }
  .client {
    padding-bottom: 32px;
  }
`;
export const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: max-content;
  height: 100%;
  row-gap: 10px;
  ${(props) => props.margin}/* overflow: scroll; */
`;
export const TitleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px !important;
  /* width: max-content !important; */

  & .list {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* overflow: visible; */
    overflow: auto;
    align-items: center;
  }
`;