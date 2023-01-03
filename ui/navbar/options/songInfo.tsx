import copy from "copy-to-clipboard";
import { useContext, useEffect, useState } from "react";
import { MdLibraryMusic } from "react-icons/md";
import { useSnapshot } from "valtio";
import { state } from "state";
import { useSong } from "utils";
import { AudioContext } from "@context/audio.context";

export function SongInfo() {
  const [song, songs] = useSong();
  const { songIndex, motion, theme } = useSnapshot(state);
  const normal = `(${songIndex + 1}/${songs.length}) ${song}`;
  const [value, setValue] = useState<string>(normal);
  const slide = "animate-[autoscroll_7s_linear_infinite]";
  const { reset } = useContext(AudioContext);
  useEffect(() => {
    setValue(normal);
  }, [songs, normal, theme]);

  return (
    <div
      className="fill group relative flex w-full cursor-pointer flex-row items-center gap-x-2 overflow-hidden rounded-lg border-[1px] border-blue-900 px-0 py-1 dark:border-blue-200"
      onMouseOver={() => {
        setValue("Click to copy song info");
      }}
      onMouseLeave={() => setValue(normal)}
      onClick={() => {
        reset();
        copy(song);
        setValue("Copied!");
        setTimeout(() => setValue(normal), 2500);
      }}
    >
      <MdLibraryMusic className="fade-transition absolute left-[6px]  h-4 w-4 md:group-hover:fill-white dark:md:group-hover:fill-black" />
      <p
        style={
          motion
            ? { animation: "none" }
            : value === "Copied!"
            ? { animation: "none", alignSelf: "center" }
            : undefined
        }
        className={`md:group-hover:text-whitedark:md:group-hover:text-black pointer-events-none  select-none whitespace-nowrap  pl-6 ${
          !motion ? slide : ""
        }`}
      >
        {songs.length > 0 ? value : "..."}
      </p>
    </div>
  );
}
