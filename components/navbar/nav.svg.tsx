import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export const Icon = styled.svg`
  display: block;
  fill: ${({ theme }) => theme.ui.secondary};
  height: 24px;
  width: 24px;

  & * {
    display: block;
  }
`;

export function MenuButton({
  setMenu,
}: {
  setMenu: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      xmlSpace="preserve"
      viewBox="0 0 384 384"
      onClick={() => setMenu((prev: boolean) => !prev)}
    >
      <path d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z"></path>
    </Icon>
  );
}
