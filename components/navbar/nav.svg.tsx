import styled from "styled-components";

export const Caret = styled.svg`
  fill: ${({ theme }) => theme.ui.secondary};
  stroke: ${({ theme }) => theme.ui.secondary} !important;
  stroke-width: 8px !important;
  height: clamp(8px, 12px, 12px);
  float: right;

  &:hover {
    -webkit-filter: drop-shadow(2px 2px 4px #ebebeb);
    filter: drop-shadow(2px 2px 4px #ebebeb);
  }
`;
