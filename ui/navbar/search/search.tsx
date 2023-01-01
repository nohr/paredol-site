"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "state";
import { SearchBarIcon } from "svg";
import { usePathname, useRouter } from "next/navigation";
import {
  useSearch,
  handleCommandPress,
  handleKeyPress,
  handleChange,
} from "utils";
import Link from "next/link";

export function Search() {
  const [placeholder, setPlaceholder] = useState<string>(`(cmd + k)`);
  const [chatText, setChatText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const Bar = useRef<any>();
  const Results = useRef<any>();
  const { chatMode, mobile, data } = useSnapshot(state);
  const router = useRouter();
  const path = usePathname();

  const hits = useSearch(data, searchText);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      handleKeyPress(
        e,
        setChatText,
        setSearchText,
        setPlaceholder,
        chatText,
        searchText,
        router,
        path
      );
      if (e.key === "Enter" && !state.chatMode) Bar.current.blur();
    });

    return () => {
      if (typeof window === "undefined") return;
      window.removeEventListener("keyup", (e: KeyboardEvent) =>
        handleKeyPress(
          e,
          setChatText,
          setSearchText,
          setPlaceholder,
          chatText,
          searchText,
          router,
          path
        )
      );
    };
  }, [searchText, chatText, setPlaceholder, chatMode, router, path]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("keydown", (e: KeyboardEvent) =>
      handleCommandPress(e, Bar, setPlaceholder)
    );
    return () => {
      if (typeof window === "undefined") return;
      window.removeEventListener("keyup", (e: KeyboardEvent) =>
        handleCommandPress(e, Bar, setPlaceholder)
      );
    };
  }, [searchText, chatText, setPlaceholder, chatMode]);

  useEffect(() => {
    if (chatText === "excuse me") {
      router.push("/login");
    }
  }, [chatText, router]);

  useEffect(() => {
    if (searchText !== "") router.push(`${path}?q=${searchText}`);
  }, [searchText, path, router]);

  useEffect(() => {
    if (mobile) {
      setPlaceholder("Search");
    }
  }, [mobile]);

  const handleClick = (e: any) => {
    if (
      Results.current?.contains(e.target) ||
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

  return (
    <>
      <div className=" relative flex h-[34px] w-[90%] items-center justify-center">
        <input
          className="inputField peer m-0 my-auto flex h-[32px] w-full px-8 text-center"
          placeholder={chatMode ? "what's up?" : placeholder}
          type="text"
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
        <div
          ref={Results}
          style={{ width: `${Bar.current.clientWidth}px` }}
          className={`fade-transition group fixed bottom-24 left-[50%] z-50 flex h-min translate-x-[-50%] flex-col rounded-xl border-[1px] border-transparent bg-blue-900 bg-opacity-60 p-3 shadow-lg shadow-blue-900 backdrop-blur-xl hover:bg-opacity-100 dark:border-transparent dark:bg-blue-200 dark:bg-opacity-60 dark:shadow-blue-200 dark:hover:bg-opacity-100 md:top-16`}
        >
          <p className="mb-3 border-b-[1px] border-white text-xs font-black uppercase text-white dark:border-white dark:text-white dark:group-hover:!border-black dark:group-hover:text-black ">
            {searchText} results
          </p>
          {hits && hits.length > 0 ? (
            hits.map((hit: any, index: number) => (
              <Link
                key={index}
                className="w-fit text-white dark:text-white dark:group-hover:text-black"
                href={`/${hit.lot}`}
                onClick={() => setSearchText("")}
                onTouchEnd={() => setSearchText("")}
              >
                {hit.name}
              </Link>
            ))
          ) : (
            <p className="self-center text-white dark:text-white dark:group-hover:text-black">
              I can't find {searchText}!
            </p>
          )}
        </div>
      )}
    </>
  );
}
