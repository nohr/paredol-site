import { ChangeEvent, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { cloud } from "../../../../common/state";
import { SearchBar, SearchWrapper } from "./search.style";
import { cloudSearch } from "./search.state";
import { handleChange } from "./search.utils";
import { ClearIcon, SearchBarIcon } from "./search.svg";

export function Search() {
  const [placeholder, setPlaceholder] = useState<string>("(alt + z)");
  const [chatText, setChatText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const Bar = useRef<any>();
  const clip = useSnapshot(cloud);
  const clipSearch = useSnapshot(cloudSearch);
  const { chatMode } = clipSearch;
  const { mobile } = clip;

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

  return (
    <SearchWrapper>
      <SearchBar
        placeholder={chatMode ? "what's up?" : placeholder}
        type="text"
        padding={
          chatText.length > 0 || searchText.length > 0
            ? "padding: 0px 25px 0px 25px !important;"
            : "padding: 0px 0px 0px 25px !important;"
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
            cloudSearch.query = "";
          }}
        >
          <ClearIcon />
        </div>
      )}
    </SearchWrapper>
  );
}
