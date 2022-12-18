import Link from "next/link";
import styled from "styled-components";

export interface IProps {
  width?: string;
  fill?: string;
  active?: string;
  left?: string;
  top?: string;
  nav?: string;
  pro?: string;
  opt?: string;
  padding?: string;
  layout?: string;
  border?: string;
}

export const Nav = styled.nav<IProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  z-index: 100;
  display: grid;
  column-gap: 10px;
  grid-template-columns: 0.25fr 0.5fr 0.25fr;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  backdrop-filter: var(--blur);
  -webkit-backdrop-filter: var(--blur);
  overflow: visible;
  padding: 10px;
  margin: 0;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  /* border-bottom: 1px solid ${({ theme }) => theme.ui?.secondary}; */

  & .logo-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100% !important;
    height: 100% !important;
    padding: 0;
    margin: 0;

    * {
      display: flex;
    }
  }

  & * {
    transition: var(--transition);
  }
`;
export const LogoWrapper = styled(Link)<IProps>`
  height: max-content;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 5px;
  padding: 0 10px 0 0px;
  margin: 0;
  overflow: visible;
  background-color: transparent !important;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  border: 1px solid transparent;
  border-radius: 15px;
  font-weight: 100;

  &:hover {
    border-color: ${({ theme }) => theme.ui?.secondary} !important;
  }

  & .r3fCanvas {
    width: 48px !important;
    height: 46px !important;
  }
`;
export const Links = styled.div<IProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin: 0;
`;
export const Path = styled(Link)<IProps>`
  display: flex;
  width: fit-content;
  height: min-content;
  margin: 4px 0;
  padding: 2px 6px;
  backdrop-filter: var(--blur) !important;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  ${({ active }) => active}
  border: 1px solid transparent;
  border-radius: 10px;
  font-weight: 100;

  &:hover {
    border-color: ${({ theme }) => theme.ui?.secondary} !important;
  }
`;
export const Toggle = styled.div<IProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: min-content;
  width: fit-content;
  margin: 3px 0;
  padding: 2px 6px;
  backdrop-filter: var(--blur) !important;
  ${({ active }) => active}
  padding: ${({ padding }) => padding} !important;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  border: 1px solid transparent;
  border-radius: 10px;
  font-weight: 100;
  fill: ${({ theme }) => theme.ui.secondary};

  & * {
    transition: var(--transition) !important;
    display: block;
  }

  &:hover {
    border-color: ${({ theme }) => theme.ui?.secondary} !important;

    & svg {
      -webkit-filter: drop-shadow(
        1px 1px 3px ${({ theme }) => theme.ui?.secondary}
      );
      filter: drop-shadow(1px 1px 3px ${({ theme }) => theme.ui?.secondary});
    }
  }

  &.trayIcon {
    cursor: pointer;
    border-radius: 50% !important;
    justify-content: center;
    width: 20px !important;
    height: 20px !important;

    svg {
      overflow: visible;
      height: 10px !important;
      width: 10px !important;
    }
  }

  .nextIcon,
  .modeIcon,
  .muteIcon {
    right: 10px;
    width: 10px;
    height: 10px;
    stroke: ${({ theme }) => theme.ui.secondary};
    stroke-width: 1px !important;
    overflow: visible;
    align-self: left;
  }

  .ColorIcon {
    right: 10px;
    width: 10px;
    height: 10px;
    stroke: transparent !important;
    overflow: visible;
    align-self: left;
  }
`;

// Panels
export const Panel = styled.div<IProps>`
  position: fixed;
  top: 68px;
  right: 40px;
  z-index: 4000 !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: var(--blur);
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.ui.secondary};
  border-radius: 5px;
  padding: 10px;
  row-gap: 30px;

  & .group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  & p {
    text-indent: 0px;
    display: block;
    text-transform: uppercase;
    font-size: xx-small;
    font-weight: 800;
    align-self: center;
    margin: 0;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  & div {
    text-indent: 10px;
  }
`;
