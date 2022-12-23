import styled, { useTheme } from "styled-components";
import { useSnapshot } from "valtio";
import { state } from "../../common/state";

export const Icon = styled.svg<{ active: string }>`
  display: flex !important;
  fill: ${({ theme }) => theme.ui.secondary};
  height: 34px;
  width: 34px;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.ui.secondary};
  border-radius: 10px;
  background-color: transparent;
  ${({ active }) => active}

  & * {
    display: flex !important;
  }
`;

export function MenuButton() {
  const { menu } = useSnapshot(state);
  const { ui } = useTheme();
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      xmlSpace="preserve"
      viewBox="0 0 384 384"
      onClick={() => (state.menu = !menu)}
      active={
        menu
          ? `border-color: ${ui.secondary}; background-color: ${ui.secondary}; fill: ${ui.background};`
          : ""
      }
    >
      <path d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z"></path>
    </Icon>
  );
}
