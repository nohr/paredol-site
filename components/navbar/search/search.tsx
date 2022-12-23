"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import { SearchBar, SearchWrapper } from "./search.style";
import { handleChange } from "./search.utils";
import { ClearIcon, SearchBarIcon } from "./search.svg";
import { usePathname, useRouter } from "next/navigation";

export function Search() {
  const [placeholder, setPlaceholder] = useState<string>(`(cmd + k)`);
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

  useEffect(() => {
    if (chatText === "excuse me") {
      router.replace("/login");
    }
    if (searchText !== "") router.replace(`/?q=${searchText}`);

    if (searchText === "" && path === "/") router.replace("/");
  }, [searchText, chatText, path, router]);

  useEffect(() => {
    if (mobile) {
      setPlaceholder("Search");
    }
  }, [mobile]);
  return (
    <SearchWrapper>
      <SearchBar
        placeholder={chatMode ? "what's up?" : placeholder}
        type="text"
        onFocus={() => {
          state.menu = false;
          state.options = false;
        }}
        value={!chatMode ? searchText : chatText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(e, chatMode, setSearchText, setChatText)
        }
        ref={Bar}
      ></SearchBar>
      <SearchBarIcon />
      {(searchText.length > 0 || chatText.length > 0) && (
        <div
          id="clearIcon"
          style={{ display: "block" }}
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
