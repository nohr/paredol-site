import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { state } from "../../../common/state";

export function handleChange(
  e: ChangeEvent<HTMLInputElement>,
  mobile: boolean,
  chatMode: boolean,
  setSearchText: Dispatch<SetStateAction<string>>,
  setChatText: Dispatch<SetStateAction<string>>
) {
  if (!state.colorBar) {
    if (!chatMode) {
      setSearchText(e.target.value);
      // cloudSearch.query = e.target.value;
    } else {
      setChatText(e.target.value);
    }
  }
}
