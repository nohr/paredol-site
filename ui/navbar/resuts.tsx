import { SFXContext } from "context/sfx";
import Link from "next/link";
import { useContext } from "react";
import { state } from "state";
import { useSearch } from "utils";
import { useSnapshot } from "valtio";

export function Results({ data, searchText, results, Bar }) {
  const { mobile } = useSnapshot(state);
  const hits = useSearch(data, searchText);
  const { confirm } = useContext(SFXContext);
  return (
    <div
      ref={results}
      style={{ width: mobile ? "90%" : `${Bar.current.clientWidth}px` }}
      className={`fade-transition group fixed bottom-24 left-[50%] z-50 flex h-fit translate-x-[-50%] flex-col rounded-xl border-[1px] border-transparent bg-blue-900 bg-opacity-60 p-3 shadow-lg shadow-blue-900 backdrop-blur-xl hover:bg-opacity-100 dark:border-transparent dark:bg-blue-200 dark:bg-opacity-60 dark:shadow-blue-200 dark:hover:bg-opacity-100 md:top-16`}
    >
      <p className="mb-3 border-b-[1px] border-white text-xs font-black uppercase text-white  dark:border-white dark:text-white dark:group-hover:!border-black dark:group-hover:text-black ">
        {searchText} results
      </p>
      {hits && hits.length > 0 ? (
        hits.map((hit: any, index: number) => (
          <Link
            onClick={() => confirm()}
            key={index}
            className="fill link my-1 w-fit border-[1px] p-1 text-white group-hover:border-white  dark:text-white dark:group-hover:border-black dark:group-hover:text-black"
            href={`/${hit.lot}`}
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
  );
}
