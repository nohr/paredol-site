import styled from "styled-components";

// Options
export const Option = styled.div`
  padding: var(--panelPadding);
  padding-bottom: 0;
  position: absolute;
  z-index: 4210;
  left: var(--edge);
  margin: 20px 0 0 0;
  display: grid;
  align-items: start;
  ${(props) => props.layout}
  ${(props) => props.hide}
    ${(props) => props.top}
      -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .audio,
  .display {
    width: 100%;
    /* overflow-y: scroll; */
    padding: 2px 2px 0px 7px;

    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 5px;
      position: absolute;
    }
    ::-webkit-scrollbar-thumb {
      border: 1px solid;
      border-color: ${({ theme }) => theme.colors.secondary};
      border-radius: 4px;
      transition: 0.3s;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
      -webkit-box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
      -moz-box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.secondary};
      transition: 0.3s;
    }
  }

  #audiohead,
  #displayhead {
    border-radius: 10px;
    text-transform: uppercase !important;
    font-size: 10px !important;
    padding-bottom: 6px;

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

  .li {
    justify-content: flex-end;
    width: 65%;
    /* margin: 4px auto 8px auto; */
    margin: 0 auto 4px auto;
    position: relative;
    height: fit-content;
    padding-right: 7px;
    transition: 0.3s;

    & svg {
      left: 10px !important;
      right: unset !important;
    }
  }

  p {
    margin: 3px auto 5px auto;
    text-align: center;
    border: 1px solid;
    border-color: transparent transparent ${({ theme }) => theme.colors.secondary}
      transparent;
    transition: 0.9s;
    stroke-width: 1px !important;
  }

  @media screen and (min-height: 768px) {
    svg:not(.ShowHideIcon):not(.light):not(.dark) {
      fill: none !important;
      stroke: ${({ theme }) => theme.colors.secondary};
    }
    .dark {
      fill: none !important;
      stroke: ${({ theme }) => theme.colors.secondary};
      stroke-width: 12px !important;
    }
  }

  .nextIcon,
  .modeIcon,
  .muteIcon,
  .ShowHideIcon {
    position: absolute;
    right: 6px;
    width: 10px;
    stroke: ${({ theme }) => theme.colors.secondary};
    stroke-width: 1px !important;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }

  .ColorIcon {
    position: absolute;
    right: 6px;
    width: 10px;
    stroke: transparent !important;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }

  .ColorChangedIcon {
    position: absolute;
    right: 6px;
    width: 10px;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
    stroke: ${({ theme }) => theme.colors.secondary};

    circle {
      fill: ${({ theme }) => theme.colors.secondary};
    }
  }

  .PlayPauseIcon {
    position: absolute;
    right: 7px;
    height: 10px;
    fill: ${({ theme }) => theme.colors.secondary};
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
  .DirectionIcon {
    stroke-width: 1px !important;
    position: absolute;
    right: 6px;
    width: 10px;
    overflow: visible;
    align-self: left;
    top: 50%;
    transform: translateY(-50%);
  }
`;
