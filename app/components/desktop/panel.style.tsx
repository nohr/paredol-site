import Link from "next/link";
import styled from "styled-components";

enum VARIANT {
  PRIMARY,
  SECONDARY,
}
interface SkewProps {
  skew: string;
}
interface IProps {
  width?: string;
  fill?: VARIANT;
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

export const Panel = styled.div<IProps>`
  ${({ nav }) => nav}
  ${({ pro }) => pro}
  ${({ opt }) => opt}

  &, & * {
    transition: 0.2s ease-in-out;
  }
  ${({ layout }) => layout}
  ${({ padding }) => padding}
  left: ${({ left }) => left} !important;
  top: ${({ top }) => top} !important;
  position: absolute;
  width: var(--panelWidth);
  height: var(--panelHeight);
  scroll-snap-type: none;
  background-color: transparent;
  backdrop-filter: blur(20px) !important;
  border: 1px solid ${({ theme }) => theme.ui?.secondary};
  color: ${({ theme }) => theme.ui?.secondary};
  border-radius: 185px;
  overflow: hidden;

  & * {
    -webkit-user-drag: none;
  }

  &.glow {
    & * {
      opacity: 0;
    }
    fill: ${({ theme }) => theme.ui?.hover} !important;
    background-color: ${({ theme }) => theme.ui?.hover} !important;
    box-shadow: 0 8px 32px 0 ${({ theme }) => theme.ui?.hover};
    -webkit-box-shadow: 0 8px 32px 0 ${({ theme }) => theme.ui?.hover};
    -moz-box-shadow: 0 8px 32px 0 ${({ theme }) => theme.ui?.hover};
  }

  .audio,
  .display {
    width: 100% !important;
    /* overflow-y: scroll; */
    padding: 2px 2px 0px 7px !important;

    & div {
      margin: 3px auto !important;
    }
  }
  #audiohead,
  #displayhead {
    margin: 3px auto 5px !important;
    border-radius: 10px;
    text-transform: uppercase !important;
    font-size: 10px !important;
    padding-bottom: 6px;
    text-align: center;
    border: 1px solid;
    border-color: transparent transparent ${({ theme }) => theme.ui.secondary}
      transparent;
    transition: 0.9s;
    stroke-width: 1px !important;

    @media screen and (min-height: 1087px) and (max-height: 1300px) {
      font-size: 0.8vh !important;
    }
    @media screen and (min-height: 1300px) {
      font-size: 0.65vh !important;
    }
  }
  .display {
    padding-bottom: 10px !important;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const LogoWrapper = styled.div<IProps>`
  height: 70px;
  width: 130px;
  display: flex;
  justify-content: center;
  /* margin: 10px 0 0px 0; */
  backdrop-filter: blur(20px) !important;
  padding-top: 5px;
  padding-bottom: 3px;
  border-radius: 75% 75% 50px 50px;
  border: 1px solid ${({ theme }) => theme.ui?.secondary};
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
  transition: 0.1s;

  & svg {
    ${(props) => props.fill}
    align-self:center;
    fill: ${({ theme }) => theme.ui?.secondary};
    color: ${({ theme }) => theme.ui?.secondary};
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.ui?.hover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    -moz-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    transition: 0.6s;
  }
  &:hover > svg {
    fill: #ebebeb;
    -webkit-filter: drop-shadow(1px 1px 3px #ebebeb);
    filter: drop-shadow(1px 1px 3px #ebebeb);
    transition: 1s;
  }
`;
export const Path = styled(Link)<IProps>`
  font-size: 13px;
  font-weight: 800;
  border-radius: 250px 250px 500px 500px;
  height: min-content;
  margin: 4px 0;
  padding: 2px 0;
  backdrop-filter: blur(20px) !important;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  ${({ active }) => active}
  ${({ width }) => width}

  &:hover {
    color: #ebebeb;
    background-color: ${({ theme }) => theme.ui?.hover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    -moz-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    /* transition: 0.6s; */
  }
`;
export const Toggle = styled.div<IProps>`
  display: flex;
  font-size: 13px;
  font-weight: 800;
  border-radius: 250px 250px 500px 500px;
  cursor: pointer;
  height: min-content;
  width: 65% !important;
  margin: 3px 0;
  padding: 2px 0;
  backdrop-filter: blur(20px) !important;
  ${({ active }) => active}
  padding: ${({ padding }) => padding} !important;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;

  &:hover {
    color: #ebebeb;
    background-color: ${({ theme }) => theme.ui?.hover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    -moz-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    /* transition: 0.6s; */

    & svg {
      fill: #ebebeb;
      stroke: #ebebeb;
      -webkit-filter: drop-shadow(1px 1px 3px #ebebeb);
      filter: drop-shadow(1px 1px 3px #ebebeb);
    }
  }

  fill: ${({ theme }) => theme.ui.secondary};

  .nextIcon,
  .modeIcon,
  .muteIcon,
  .ShowHideIcon {
    position: absolute;
    right: 10px;
    width: 10px;
    stroke: ${({ theme }) => theme.ui.secondary};
    stroke-width: 1px !important;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }

  .ColorIcon {
    position: absolute;
    right: 10px;
    width: 10px;
    stroke: transparent !important;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }

  .DirectionIcon {
    /* stroke: transparent !important; */
    fill: ${({ theme }) => theme.ui.secondary} !important;
    stroke-width: 1px !important;
    position: absolute;
    right: 10px;
    width: 10px;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
`;
export const Folder = styled.div<IProps>`
  width: 100%;
  margin: 3px 0;
  padding: 2px 0;
  display: block;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  fill: ${({ theme }) => theme.ui.secondary};
  ${({ border }) => border};
  backdrop-filter: blur(20px) !important;

  &:hover {
    background-color: ${({ theme }) => theme.ui?.hover} !important;
    -webkit-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    -moz-box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
    box-shadow: 0px 3px 10px 1px ${({ theme }) => theme.ui?.hover} !important;
  }

  &.trayIcon {
    border-radius: 50% !important;
    justify-content: center;
    width: 20px !important;
    height: 20px !important;

    &:hover > svg {
      fill: #ebebeb !important;
    }
    svg {
      overflow: visible;
      height: 10px !important;
      width: 10px !important;
    }
  }

  &.mono {
    width: 60% !important;
    grid-area: 3/ 1 / span 1 / span 2;
    text-align: center;
    color: ${({ theme }) => theme.ui.main};
    border: 1px solid ${({ theme }) => theme.ui.main};
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
  }

  &.resetPos {
    pointer-events: all;
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
    /* border: 1px solid #${({ theme }) => theme.ui.secondary}; */
    border-radius: 50%;
    justify-content: center;
    display: flex;
    height: 50px;
    width: 50px;
    flex-direction: column;
    /* padding: 2px; */

    & svg {
      stroke: #${({ theme }) => theme.ui.secondary};
      width: 28px !important;
      stroke-width: 3px;
    }
  }

  &.circleButton {
    z-index: 6000;
    border-radius: 50% !important;
    width: 70px !important;
    height: 70px !important;
    display: flex !important;
    justify-content: center !important;
  }

  &.color {
    border-color: #ebebeb !important;
    fill: ${({ theme }) => theme.ui.hover};
    background-color: ${({ theme }) => theme.ui.hover};
    -webkit-filter: drop-shadow(1px 1px 6px ${({ theme }) => theme.ui.hover});
    filter: drop-shadow(1px 1px 6px ${({ theme }) => theme.ui.hover});
    text-align: center;

    & svg {
      animation: flashConfirm 1s steps(5, start) infinite;
      animation-delay: 3s;
      -webkit-filter: none;
      filter: none;
      fill: #ebebeb;
    }
    transition: 0s;
    outline: 0px;
  }
  &.reset {
    border-color: #ebebeb !important;
    color: #ebebeb;
    background-color: ${({ theme }) => theme.ui.active};
    -webkit-filter: drop-shadow(1px 1px 6px ${({ theme }) => theme.ui.active});
    filter: drop-shadow(1px 1px 6px ${({ theme }) => theme.ui.active});
    text-align: center;
    transition: 0.3s;
  }

  .light,
  .dark {
    stroke-width: 1px !important;
  }
  .nextIcon,
  .muteIcon,
  .ShowHideIcon,
  .ColorIcon {
    fill: ${({ theme }) => theme.ui.secondary} !important;
    overflow: visible;
  }

  .ConfirmIcon,
  .ResetIcon {
    height: 80%;
  }
  .ResetIcon {
    fill: #ebebeb;
  }

  .PlayPauseIcon {
    fill: ${({ theme }) => theme.ui.secondary} !important;
    overflow: visible;
  }

  &.songinfo {
    cursor: text;
    user-select: text !important;
    -ms-user-select: text !important;
    -moz-user-select: text !important;
    -webkit-user-select: text !important;
    border-radius: 10px !important;
    background: inherit !important;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 0 0 0px 15px !important;
    width: 80% !important;
    height: 35px !important;

    & textarea {
      overflow-y: scroll;
      padding: 0 !important;
      border: none !important;
      background-color: transparent !important;
      width: 95% !important;
      height: inherit;
      /* height: fit-content !important; */
      resize: none;
      color: ${({ theme }) => theme.ui.secondary} !important;
      ::-webkit-scrollbar {
        display: none !important;
      }
      &:active {
        border: 1px solid ${({ theme }) => theme.ui.secondary} !important;
      }
    }
    &:hover {
      background-color: ${({ theme }) => theme.ui.tertiary} !important;
      box-shadow: inherit !important;
      color: inherit !important;
    }
  }
`;

// Nav
export const Skew = styled.div<SkewProps>`
  transition: 0.1s;
  position: absolute;
  z-index: 5000;
  top: var(--edge);
  left: 40%;
`;
export const Header = styled.div`
  touch-action: none;
  height: 130px;
  width: 100%;
  margin: 0 0 8px 0;
  padding: 25px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  row-gap: 2px !important;
  flex-direction: column;
  flex-wrap: nowrap;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.ui?.secondary} !important;
  /* backdrop-filter: blur(20px) !important; */

  &:hover {
    cursor: grab;
    background-color: ${({ theme }) => theme.ui?.hover} !important;
    color: #ebebeb !important;

    & svg {
      fill: #ebebeb;
    }
  }
`;
export const TrayWrapper = styled.div`
  transform: rotate(2deg);
  padding: 0 5px;
  height: 28px;
  margin: auto 0;
  width: 90% !important;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
  border: 1px solid;
  border-radius: 50px !important;
`;
