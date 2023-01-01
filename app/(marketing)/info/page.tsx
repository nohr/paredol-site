import Bio from "@ui/info/bio";
import Contact from "@ui/info/contact";
import Roster from "@ui/info/roster";

export default function InfoPage() {
  return (
    <div className="flex h-full flex-col md:!gap-y-4">
      <div className="flex flex-col gap-x-2 md:grid md:grid-cols-[60%_40%] md:grid-rows-[50%]">
        <Bio />
        <Roster />
      </div>
      <Contact />
    </div>
  );
}
