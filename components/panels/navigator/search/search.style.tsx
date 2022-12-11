import styled from "styled-components";

type Props = {
  padding?: string;
};

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 90% !important;
  transform: rotate(2deg);
  height: 28px;
`;
export const SearchBar = styled.input<Props>`
  ${({ padding }) => padding}
  border: none !important;
  border-radius: 50px;
  width: 100%;
  height: 28px;
  margin: auto 0;
  backdrop-filter: blur(20px) !important;
  display: flex;
  background-color: transparent;
  box-shadow: 0 0 0 1px
    ${(props: { theme: { colors: { secondary: string } } }) =>
      props.theme.colors.secondary};
  -webkit-box-shadow: 0 0 0 1px
    ${(props: { theme: { colors: { secondary: string } } }) =>
      props.theme.colors.secondary};
  -moz-box-shadow: 0 0 0 1px
    ${(props: { theme: { colors: { secondary: string } } }) =>
      props.theme.colors.secondary};
  color: ${(props: { theme: { colors: { secondary: string } } }) =>
    props.theme.colors.secondary};
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
    text-align: start;
    color: ${(props: { theme: { colors: { secondary: string } } }) =>
      props.theme.colors.secondary};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &:hover::placeholder {
    color: #ebebeb;
    transition: 0.3s;
  }
  &:hover {
    color: #ebebeb;
    background-color: ${(props: { theme: { colors: { hover: string } } }) =>
      props.theme.colors.hover};
    outline: 1px solid #ebebeb;
    box-shadow: 0 0 0 1px
      ${(props: { theme: { colors: { secondary: string } } }) =>
        props.theme.colors.secondary};
    -webkit-box-shadow: 0 0 0 1px
      ${(props: { theme: { colors: { secondary: string } } }) =>
        props.theme.colors.secondary};
    -moz-box-shadow: 0 0 0 1px
      ${(props: { theme: { colors: { secondary: string } } }) =>
        props.theme.colors.secondary};
    transition: 0.3s;
  }
  &:focus::placeholder {
    color: #ebebeb;
    transition: 0.3s;
  }
  &:focus {
    color: #ebebeb;
    background-color: ${(props: { theme: { colors: { hover: string } } }) =>
      props.theme.colors.hover};
    outline: 1px solid #ebebeb;
    box-shadow: 0 0 50px 50px
      ${(props: { theme: { colors: { hover: string } } }) =>
        props.theme.colors.hover};
    -webkit-box-shadow: 0 0 50px 50px
      ${(props: { theme: { colors: { hover: string } } }) =>
        props.theme.colors.hover};
    -moz-box-shadow: 0 0 50px 50px
      ${(props: { theme: { colors: { hover: string } } }) =>
        props.theme.colors.hover};
    transition: 0.3s;
  }
  &:focus ~ #searchIcon,
  &:hover ~ #searchIcon,
  &:focus ~ #clearIcon svg,
  &:hover ~ #clearIcon svg,
  &:focus ~ #cdIcon,
  &:hover ~ #cdIcon {
    fill: #ebebeb !important;
    transition: 0.3s;
  }
`;
