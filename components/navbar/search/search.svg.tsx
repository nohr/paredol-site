import { useSnapshot } from "valtio";
import { state } from "../../../common/state";

export function SearchBarIcon() {
  const { chatMode } = useSnapshot(state);

  if (chatMode) {
    //CD
    return (
      <svg
        className="pointer-events-auto absolute top-[50%] left-[6px] h-4 translate-y-[-50%] cursor-pointer fill-transparent stroke-blue-900 stroke-[1px] peer-hover:stroke-white peer-focus:stroke-white dark:stroke-blue-200 dark:peer-hover:stroke-black md:hover:opacity-[50%]"
        onClick={() => (state.chatMode = false)}
        onTouchEnd={() => (state.chatMode = false)}
        viewBox="0 0 354 356"
      >
        <g data-name="CD">
          <path
            vectorEffect="non-scaling-stroke"
            d="M177.3 179.8c38 0 67.8 29.7 68.1 67.5S215 316 177.3 316s-68.4-30.4-68.4-68.1c-.9-37.7 29.8-68.1 68.4-68.1zM76.1 175.9c-37.7 0-66.9-29.7-66.9-68.1C9.3 70.7 39 40.3 76.1 40h1.8c37.1.3 67.8 31.3 67.2 68.4 0 38-30.4 67.8-69 67.5zM277 175.9c-38.3 0-68.7-29.7-68.7-67.8 0-37.4 31.3-68.4 69.3-68.1 37.4.3 67.5 30.7 67.2 68.1v.3c-.4 38-29.8 67.5-67.8 67.5z"
          ></path>
        </g>
      </svg>
    );
  } else {
    // Search
    return (
      <svg
        className="pointer-events-auto absolute top-[50%] left-[6px] h-4 translate-y-[-50%] cursor-pointer fill-blue-900 stroke-[1px] peer-hover:fill-white peer-focus:fill-white dark:fill-blue-200 dark:peer-hover:fill-black md:hover:opacity-[50%]"
        onClick={() => (state.chatMode = true)}
        onTouchEnd={() => (state.chatMode = false)}
        viewBox="0 0 354 356"
      >
        <path
          vectorEffect="non-scaling-stroke"
          d="M306.6 297.8L255 243c-10.2-10.6-13.9-22.8-6.8-35.8 9.3-17.2 14.3-36.6 14.3-56.5 0-67-55.8-121.2-123.4-118.6C77.5 34.5 27.6 84.4 25.2 146c-2.6 67.6 51.6 123.4 118.6 123.4 16.6 0 32.8-3.4 47.7-10 12.6-5.6 18.6.7 39.8 18.5 13.6 11.5 53.7 46.6 53.5 46.8 17.7 17.8 40.6-8.1 21.8-26.9zM143.8 70.7c44.1 0 80 35.9 80 80s-35.9 80-80 80-80-35.9-80-80 35.9-80 80-80z"
        ></path>
      </svg>
    );
  }
}
