import { usePathname } from "next/navigation";
import { programObject } from "svg";

const ProgramTray = `
  & svg {
    width: auto;
    overflow: visible;
    margin: 5px 5px;
    -webkit-filter: drop-shadow(0px 1px 1px #0d0d0d);
    filter: drop-shadow(0px 1px 1px #0d0d0d);
  }
`;
export function Program({ ...props }) {
  const { program, setProgram } = props;
  const path = usePathname();
  return (
    <div className="Program box flex h-min w-fit flex-row flex-wrap justify-start overflow-x-visible rounded-xl bg-zinc-300 bg-opacity-20 p-0 backdrop-blur-xl dark:bg-zinc-700 md:p-2 ">
      {program.map((one: string, key: number) => (
        // <div className="tooltip" key={key} data-tip={one}>
        <div
          key={key}
          title={one}
          className="program p-1 [&>svg]:h-6 [&>svg]:w-6 md:[&>svg]:h-8 md:[&>svg]:w-8"
          onClick={() =>
            path?.includes("/editor/") &&
            setProgram((prev: string[]) =>
              prev.filter((item: any) => item !== one)
            )
          }
        >
          {programObject[one] ? programObject[one] : one}
        </div>
        // </div>
      ))}
    </div>
  );
}
