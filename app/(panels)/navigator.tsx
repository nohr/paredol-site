"use client";
import styles from "./panels.module.scss";
import Link from "next/link";
import { useState } from "react";
import { Options } from "./options";
import { Posts } from "./posts";
import Toggle from "./Toggle";

// import

export const Navigator = () => {
  const [options, setOptions] = useState(false);
  const [posts, setPosts] = useState(false);

  const onClick = (panel: string) => {
    if (panel === "posts") {
      setPosts((prev) => !prev);
    }
    if (panel === "options") {
      setOptions((prev) => !prev);
    }
  };
  return (
    <>
      <div className={styles.panel}>
        <div className={styles.controls}>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/info">Info</Link>
          <Link href="/store">Store</Link>
          <Toggle panel="posts" onClick={onClick} />
          <Toggle panel="options" onClick={onClick} />
        </div>
      </div>
      {posts && <Posts />}
      {options && <Options />}
    </>
  );
};
