"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "state";
import { SearchBarIcon } from "svg";
import { usePathname, useRouter } from "next/navigation";
import { handleChange, toggleEnableMotion, toggleTheme } from "utils";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { Results } from "./resuts";
import { DocumentData } from "firebase/firestore/lite";

export function Search({ data }: DocumentData) {
  const [placeholder, setPlaceholder] = useState<string>(`(cmd + k)`);
  const [chatText, setChatText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const Bar = useRef<any>();
  const results = useRef<any>();
  const { chatMode, mobile } = useSnapshot(state);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (searchText !== "") router.push(`${path}?q=${searchText}`);
    if (searchText === "") router.push(`${path}`);
  }, [searchText, path, router]);

  // clear the search bar when the user navigates away from the search page
  useEffect(() => {
    return () => setSearchText("");
  }, [path]);

  useEffect(() => {
    if (mobile) {
      setPlaceholder("Search");
    }
  }, [mobile]);

  const handleClick = (e: any) => {
    if (
      results.current?.contains(e.target) ||
      Bar.current?.contains(e.target)
    ) {
      return;
    }
    setSearchText("");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("mousedown", handleClick);
    return () => {
      if (typeof window === "undefined") return;
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // handle chat input
  useEffect(() => {
    if (chatMode) {
      if (chatText === "excuse me") {
        router.push(`login`);
        setChatText("");
      }
      if (chatText === "dark") {
        toggleTheme("dark");
        setChatText("");
      } else if (chatText === "light") {
        toggleTheme("light");
        setChatText("");
      }
      if (chatText === "color") {
        state.options = true;
        state.colorBar = true;
        setChatText("");
      }
      if (chatText === "reduce enableMotion") {
        toggleEnableMotion("reduce");
        setChatText("");
      }
      if (chatText === "help") {
        setChatText(
          "try typing clear, dark, light, reduce enableMotion, or color"
        );
      }
    }
  }, [chatText]);

  // focus on search bar when cmd + k is pressed
  useKeyboardShortcut(
    ["Meta", "K"] || ["Control", "K"],
    () => {
      setPlaceholder("");
      Bar.current.focus();
    },
    {
      overrideSystem: true,
      repeatOnHold: false,
    }
  );

  // blur search bar when esc is pressed
  function blurSearchBar() {
    setSearchText("");
    setChatText("");
    Bar.current.blur();
  }

  //  toggle chat mode when tab is pressed
  useKeyboardShortcut(["Meta", "Alt"], () => {
    state.chatMode = !chatMode;
    if (state.chatMode) {
      setPlaceholder("what's up?");
      Bar.current.focus();
    } else {
      setPlaceholder(mobile ? "Search" : `(cmd + k)`);
      Bar.current.blur();
    }
  });

  // handle enter key press
  // useKeyboardShortcut(
  //   ["Enter"],
  //   () => {
  //     if (chatText.length > 0) {
  //       console.log(chatText);
  //     }
  //   },
  //   {
  //     overrideSystem: false,
  //     repeatOnHold: false,
  //   }
  // );

  return (
    <>
      {/* Searchbar */}
      <div className=" relative flex h-[34px] w-[90%] items-center justify-center">
        <input
          className="inputField peer m-0 my-auto flex h-[32px] w-full px-8 text-center"
          placeholder={chatMode ? "what's up?" : placeholder}
          type="text"
          onKeyUp={(e) => {
            // check if the key is enter
            if (e.key === "Enter") {
              if (chatText.length > 0) {
                console.log(chatText);
              }
            } else if (e.key === "Escape") {
              blurSearchBar();
            }
          }}
          onFocus={() => {
            setPlaceholder("");
            state.menu = false;
            state.options = false;
          }}
          onBlur={() => {
            setPlaceholder(mobile ? "Search" : `(cmd + k)`);
          }}
          value={!chatMode ? searchText : chatText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, chatMode, setSearchText, setChatText)
          }
          ref={Bar}
        ></input>
        <SearchBarIcon />
        {(searchText.length > 0 || chatText.length > 0) && (
          <svg
            onClick={() => {
              Bar.current?.focus();
              setSearchText("");
              setChatText("");
            }}
            className="pointer-events-auto absolute top-[52%] right-[15px] h-[14px] translate-x-[50%] translate-y-[-57%] cursor-pointer fill-blue-900 hover:opacity-[50%] peer-hover:fill-white peer-focus:fill-white dark:fill-blue-200 dark:peer-hover:fill-black"
            viewBox="0 0 52.98 52.98"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M44.37 7.6a26 26 0 100 36.77 26 26 0 000-36.77zm-8.13 28.64a2 2 0 01-2.83 0L26 28.82l-7.78 7.77a2 2 0 11-2.83-2.82L23.16 26l-7.42-7.43a2 2 0 112.82-2.82L26 23.16l7.07-7.07a2 2 0 012.83 2.83L28.82 26l7.42 7.42a2 2 0 010 2.82z"
            ></path>
          </svg>
        )}
      </div>
      {/* results panel */}
      {searchText !== "" && !chatMode && (
        <Results
          data={data}
          searchText={searchText}
          results={results}
          Bar={Bar}
        />
      )}
    </>
  );
}
