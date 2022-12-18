"use client";

import { ChangeEvent, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import { SearchBar, SearchWrapper } from "./search.style";
import { handleChange } from "./search.utils";
import { ClearIcon, SearchBarIcon } from "./search.svg";
import { usePathname, useRouter } from "next/navigation";

export function Search() {
  const [placeholder, setPlaceholder] = useState<string>("(alt + z)");
  const [chatText, setChatText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const Bar = useRef<any>();
  const { chatMode, mobile } = useSnapshot(state);
  const router = useRouter();
  const path = usePathname();

  // useEffect(() => {
  //   let keys = {};

  //   if (Bar.current) {
  //     Bar.current.addEventListener("keydown", (e) =>
  //       handleKeyPress(
  //         e,
  //         setSearchText,
  //         Bar,
  //         setPlaceholder,
  //         setChatText,
  //         clip,
  //         chatText
  //         // admin,
  //         // user
  //       )
  //     );
  //   }
  //   window.addEventListener("click", handleClick(Bar, setPlaceholder));
  //   window.addEventListener("keydown", (e) =>
  //   handleCommandPress(e, keys, Bar, setPlaceholder)
  //   );

  //   return () => {
  //     // if (Bar.current) {
  //     //   Bar.current.removeEventListener("keydown", (e) =>
  //     //     handleKeyPress(
  //     //       e,
  //     //       setSearchText,
  //     //       Bar,
  //     //       setPlaceholder,
  //     //       setChatText,
  //     //       clip
  //     //     )
  //     //   );
  //     // }
  //     // window.removeEventListener("click", handleClick);
  //     // window.removeEventListener("keydown", handleCommandPress);
  //   };
  // }, [chatText, searchText, clip.chatMode, clip]);

  if (chatText === "excuse me") {
    setChatText("");
    router.push("/login");
  }

  if (searchText !== "") router.replace(`/?q=${searchText}`);

  return (
    <SearchWrapper>
      <SearchBar
        placeholder={chatMode ? "what's up?" : placeholder}
        type="text"
        padding={
          chatText.length > 0 || searchText.length > 0
            ? "margin: 0px 30px 0px 30px !important;"
            : "margin: 0px 0px 0px 30px !important;"
        }
        value={!chatMode ? searchText : chatText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, mobile, chatMode, setSearchText, setChatText)
        }
        ref={Bar}
      ></SearchBar>
      {chatMode}
      <SearchBarIcon />
      {(searchText.length > 0 || chatText.length > 0) && (
        <div
          id="clearIcon"
          onClick={() => {
            Bar.current?.focus();
            setSearchText("");
            setChatText("");
          }}
        >
          <ClearIcon />
        </div>
      )}
    </SearchWrapper>
  );
}
