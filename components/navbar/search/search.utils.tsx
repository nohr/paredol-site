import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { state } from "../../../common/state";
import { toggleTheme } from "../../../common/utils";
import { toggleMotion } from "../options/opt.utils";

export function useChange(
  e: ChangeEvent<HTMLInputElement>,
  chatMode: boolean,
  setSearchText: Dispatch<SetStateAction<string>>,
  setChatText: Dispatch<SetStateAction<string>>
) {
  if (!state.colorBar) {
    if (!chatMode) {
      setSearchText(e.target.value);
    } else {
      setChatText(e.target.value);
      if (e.target.value === "excuse me") {
        state.chatMode = false;
        setChatText("");
      }
    }
  }
}

export function handleKeyPress(
  e: KeyboardEvent,
  setSearchText: Dispatch<SetStateAction<string>>,
  setChatText: Dispatch<SetStateAction<string>>,
  setPlaceholder: Dispatch<SetStateAction<string>>,
  chatText: string,
  searchText: string,
  router: any,
  path: string | null
) {
  if (e.key === "Enter" && state.chatMode) {
    e.preventDefault();
    setChatText("");
    if (chatText === "dark") {
      toggleTheme("dark");
    }
    if (chatText === "light") {
      toggleTheme("light");
    }
    if (chatText === "color") {
      state.colorBar = true;
    }
    if (chatText === "reduce motion") {
      toggleMotion("reduce");
    }
    if (chatText === "help") {
      setPlaceholder("try typing clear, dark, light, reduce motion, or color");
    }
  }
  if (e.key === "Escape") {
    e.preventDefault();
    if (state.chatMode) {
      setPlaceholder(`(cmd + k)`);
    }
    setSearchText("");
  }
  if (e.key === "Tab") {
    e.preventDefault;
    state.chatMode = !state.chatMode;
  }
  if (searchText === "") router.replace(`${path}`);
}

export function handleCommandPress(
  e: KeyboardEvent,
  Bar: React.RefObject<HTMLInputElement>,
  setPlaceholder: Dispatch<SetStateAction<string>>
) {
  if (e.key === "k" && e.metaKey) {
    e.preventDefault();
    setPlaceholder("");
    Bar.current?.focus();
  }
}
