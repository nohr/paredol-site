import Bio from "@ui/info/bio";
import Contact from "@ui/info/contact";
import Roster from "./Roster";

export default function InfoPage() {
  return (
    <div className="flex h-full flex-col md:!gap-y-4">
      <div className="flex flex-col gap-x-2 md:flex-row">
        {/* @ts-expect-error Server Component */}
        <Bio />
        {/* @ts-expect-error Server Component */}
        <Roster />
      </div>
      <Contact />
    </div>
  );
}
