"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Options } from "./options";
import { Posts } from "./posts";
import Toggle from "./Toggle";

// import

export const Navigator = () => {
  const [options, setOptions] = useState(false);
  const [posts, setPosts] = useState(false);

  // useEffect(() => {
  //   console.log("options", options);
  //   console.log("posts", posts);
  // }, [options, posts]);

  const onClick = (panel: string) => {
    console.log(panel);

    if (panel === "posts") {
      setPosts((prev) => !prev);
    }
    if (panel === "options") {
      setOptions((prev) => !prev);
    }
  };
  return (
    <>
      <div className="navigator panel">
        <div className="grid">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/info">Info</Link>
          <Link href="/store">Store</Link>
        </div>
        <Toggle panel="posts" onClick={onClick} />
        <Toggle panel="options" onClick={onClick} />
      </div>
      {posts && <Posts />}
      {options && <Options />}
    </>
  );
};
