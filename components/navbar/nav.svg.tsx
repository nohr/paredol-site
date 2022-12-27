import { useSnapshot } from "valtio";
import { state } from "../../common/state";

export function MenuButton() {
  const { menu } = useSnapshot(state);
  return (
    <div
      onClick={() => (state.menu = !menu)}
      className={`h-fit w-fit rounded-xl border-[1px] border-blue-900 p-1  dark:border-blue-200 md:!hidden ${
        menu ? "bg-blue-900 dark:bg-blue-200" : "bg-transparent"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        xmlSpace="preserve"
        viewBox="0 0 384 384"
        className={`h-6 w-6 bg-transparent`}
      >
        <path
          className={`${
            menu
              ? "fill-white dark:fill-black"
              : "fill-blue-900 dark:fill-blue-200"
          }`}
          d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z"
        ></path>
      </svg>
    </div>
  );
}
