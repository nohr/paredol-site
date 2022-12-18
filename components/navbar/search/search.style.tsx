import styled from "styled-components";

type Props = {
  padding?: string;
};

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 90% !important;
  height: 28px;
`;
export const SearchBar = styled.input<Props>`
  ${({ padding }) => padding}
  text-align: center;
  border: none !important;
  border-radius: 10px;
  width: 100%;
  height: 28px;
  margin: auto 0;
  backdrop-filter: blur(20px) !important;
  display: flex;
  background-color: transparent;
  box-shadow: 0 0 0 1px
    ${(props: { theme: { ui: { secondary: string } } }) =>
      props.theme.ui.secondary};
  -webkit-box-shadow: 0 0 0 1px
    ${(props: { theme: { ui: { secondary: string } } }) =>
      props.theme.ui.secondary};
  -moz-box-shadow: 0 0 0 1px
    ${(props: { theme: { ui: { secondary: string } } }) =>
      props.theme.ui.secondary};
  color: ${(props: { theme: { ui: { secondary: string } } }) =>
    props.theme.ui.secondary};
  user-select: text;
  -moz-user-select: text;
  -webkit-user-select: text;
  font-size: 13px;
  cursor: pointer;

  #searchIcon {
    position: absolute;
    top: 0 !important;
    left: 0 !important;
  }

  &::placeholder {
    text-align: center;
    color: ${(props: { theme: { ui: { secondary: string } } }) =>
      props.theme.ui.secondary};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:hover::placeholder {
    color: #ebebeb;
  }
  &:hover {
    color: #ebebeb;
    background-color: ${(props: { theme: { ui: { hover: string } } }) =>
      props.theme.ui.hover};
    outline: 1px solid #ebebeb;
    box-shadow: 0 0 0 1px
      ${(props: { theme: { ui: { secondary: string } } }) =>
        props.theme.ui.secondary};
    -webkit-box-shadow: 0 0 0 1px
      ${(props: { theme: { ui: { secondary: string } } }) =>
        props.theme.ui.secondary};
    -moz-box-shadow: 0 0 0 1px
      ${(props: { theme: { ui: { secondary: string } } }) =>
        props.theme.ui.secondary};
  }
  &:focus::placeholder {
    color: #ebebeb;
  }
  &:focus {
    color: #ebebeb;
    background-color: ${(props: { theme: { ui: { hover: string } } }) =>
      props.theme.ui.hover};
    outline: 1px solid #ebebeb;
    box-shadow: 0 0 50px 50px
      ${(props: { theme: { ui: { hover: string } } }) => props.theme.ui.hover};
    -webkit-box-shadow: 0 0 50px 50px
      ${(props: { theme: { ui: { hover: string } } }) => props.theme.ui.hover};
    -moz-box-shadow: 0 0 50px 50px
      ${(props: { theme: { ui: { hover: string } } }) => props.theme.ui.hover};
  }
  &:focus ~ #searchIcon,
  &:focus ~ #clearIcon svg {
    fill: #ebebeb !important;
  }

  &:focus ~ #cdIcon {
    stroke: #ebebeb !important;
    fill: transparent !important;
  }
`;

export const BarIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
  height: 16px;
  fill: ${({ theme }) => theme.ui.secondary};
  cursor: pointer;
  stroke-width: 1px;
  &,
  & path,
  & g,
  & g path {
    display: block;
  }

  g {
    height: 12px;
  }
  &:hover {
    opacity: 50%;
    pointer-events: painted;
  }

  &#cdIcon {
    stroke: ${({ theme }) => theme.ui.secondary} !important;
    stroke-width: 1px !important;
    fill: transparent !important;
  }
`;
