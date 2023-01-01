// "use client";

import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useSnapshot } from "valtio";
import { getSongs } from "@api/firebase.api";
import { state } from "state";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@api/firebase.config";
// search
export const useSearch = (projects: any, query: any) => {
  if (query === "") return projects;
  return (
    projects &&
    projects.filter((item: { [x: string]: { toString: () => string } }) =>
      Object.keys(item).some((key) =>
        key === "cover" || key === "published"
          ? false
          : item[key].toString().toLowerCase().includes(query.toLowerCase())
      )
    )
  );
};

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

export function handleKeyPress(
  e: KeyboardEvent,
  setSearchText: Dispatch<SetStateAction<string>>,
  setChatText: Dispatch<SetStateAction<string>>,
  setPlaceholder: Dispatch<SetStateAction<string>>,
  chatText: string,
  searchText: string,
  router: any,
  path: string | null
) {
  if (e.key === "Enter" && state.chatMode) {
    e.preventDefault();
    setChatText("");
    if (chatText === "dark") {
      toggleTheme("dark");
    }
    if (chatText === "light") {
      toggleTheme("light");
    }
    if (chatText === "color") {
      state.colorBar = true;
    }
    if (chatText === "reduce motion") {
      toggleMotion("reduce");
    }
    if (chatText === "help") {
      setPlaceholder("try typing clear, dark, light, reduce motion, or color");
    }
  }
  if (e.key === "Escape") {
    e.preventDefault();
    if (state.chatMode) {
      setPlaceholder(`(cmd + k)`);
    }
    setSearchText("");
  }
  if (e.key === "Tab") {
    e.preventDefault;
    state.chatMode = !state.chatMode;
  }
  if (searchText === "") router.replace(`${path}`);
}

export function handleCommandPress(
  e: KeyboardEvent,
  Bar: React.RefObject<HTMLInputElement>,
  setPlaceholder: Dispatch<SetStateAction<string>>
) {
  if (e.key === "k" && e.metaKey) {
    e.preventDefault();
    setPlaceholder("");
    Bar.current?.focus();
  }
}

// Options
export const toggleMute = () => {
  state.muted = !state.muted;
};
export const toggleMotion = (motion?: string) => {
  if (motion === "reduce") {
    state.motion = true;
    localStorage.setItem("motion", `true`);
    return;
  }
  state.motion = !state.motion;
  localStorage.setItem("motion", `${state.motion}`);
};

// UI
export function useMounted() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

export const useTheme = () => {
  if (typeof window !== "undefined") {
    // Check for dark mode preference
    const userTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const docTheme: HTMLMetaElement | null = document.querySelector(
      "meta[name='theme-color']"
    );

    if (userTheme === "dark" || (!userTheme && systemDark)) {
      document.documentElement.classList.add("dark");
      if (docTheme) docTheme.content = "#101010";
      state.theme = "dark";
      return;
    } else {
      if (docTheme) docTheme.content = "#ebebeb";
      state.theme = "light";
    }
  }
};

export const toggleTheme = (theme?: string) => {
  if (typeof document !== "undefined") {
    const docTheme: HTMLMetaElement | null = document.querySelector(
      "meta[name='theme-color']"
    );
    if (
      document.documentElement.classList.contains("dark") ||
      theme === "light"
    ) {
      document.documentElement.classList.remove("dark");
      if (docTheme) docTheme.content = "#ebebeb";
      localStorage.setItem("theme", "light");
      state.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      if (docTheme) docTheme.content = "#101010";
      localStorage.setItem("theme", "dark");
      state.theme = "dark";
    }
  }
};

export function useMobile() {
  if (typeof window !== "undefined") {
    state.mobile = window.matchMedia("(max-width: 768px)").matches;
  }
}

export function useMotion() {
  if (typeof window !== "undefined") {
    // Check for reduced motion preference
    const userMotion = localStorage.getItem("motion");
    const systemMotion = window.matchMedia(
      `(prefers-reduced-motion: reduce)`
    ).matches;

    if (userMotion === "true" || systemMotion) {
      state.motion = true;
      return;
    }
  }
}

export function useSong() {
  const { songIndex } = useSnapshot(state);
  const songs = useRef<any>([]);
  const [song, setSong] = useState("");

  useEffect(() => {
    getSongs().then((res) => {
      songs.current = res;

      setSong(
        `${songs.current[songIndex]?.artist} - ${songs.current[songIndex]?.name}`
      );
    });
  }, [songIndex]);

  function nextSong() {
    if (songIndex < songs.current.length - 1) {
      state.songIndex++;
    } else {
      state.songIndex = 0;
    }
  }

  return [song, songs.current, setSong, nextSong];
}

export async function loadSong(song: string) {
  // get the url of the song from firebase storage
  const songRef = ref(storage, `info/songs/${song}.mp3`);
  const url = await getDownloadURL(songRef).then((url) => {
    return url;
  });
  return url;
}
// export function useWindowDimensions() {
//   let dimensions: any;
//   useEffect(() => {
//     function getWindowDimensions() {
//       if (typeof window === "undefined") {
//         let { innerWidth: width, innerHeight: height } = window;
//         return {
//           width,
//           height,
//         };
//       }
//     }
//     const [windowDimensions, setWindowDimensions] = useState(
//       getWindowDimensions()
//     );

//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     if (typeof window !== "undefined")
//       window.addEventListener("resize", handleResize);
//     dimensions = windowDimensions;
//     return () => {
//       if (typeof window !== "undefined")
//         window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return dimensions;
// }
