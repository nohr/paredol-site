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
    <div className="Program box flex h-min flex-row flex-wrap justify-start overflow-x-visible rounded-xl bg-zinc-300 p-1 backdrop-blur-xl dark:bg-zinc-700 md:p-2 ">
      {program.map((one: string, key: number) => (
        <div
          className="program p-3  [&>svg]:h-8 [&>svg]:w-8"
          title={one}
          key={key}
          onClick={() =>
            path?.includes("/editor/") &&
            setProgram((prev: string[]) =>
              prev.filter((item: any) => item !== one)
            )
          }
        >
          {programObject[one] ? programObject[one] : one}
        </div>
      ))}
    </div>
  );
}
