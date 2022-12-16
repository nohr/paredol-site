import { useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { cloudPanel, statePanel } from "../../panel.state";
import { cloudSearch } from "./search.state";

export function handleChange(
  e: ChangeEvent<HTMLInputElement>,
  mobile: boolean,
  chatMode: boolean,
  setSearchText: Dispatch<SetStateAction<string>>,
  setChatText: Dispatch<SetStateAction<string>>
) {
  if (!cloudPanel.colorWheel) {
    if (!chatMode) {
      setSearchText(e.target.value);
      cloudSearch.query = e.target.value;
      if (!mobile) statePanel.isPro = true;
    } else {
      setChatText(e.target.value);
    }
  }
}
