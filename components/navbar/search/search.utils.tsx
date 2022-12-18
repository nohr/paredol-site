import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { state } from "../../../common/state";

export function handleChange(
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
