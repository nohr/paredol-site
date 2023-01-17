export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "only-no-store",
  runtime = "nodejs",
  preferredRegion = "auto";

import Bio from "@ui/info/bio";
import Contact from "@ui/info/contact";
import Roster from "./Roster";
import Name from "@ui/info/name";

export default function InfoPage() {
  return (
    <div className="flex h-full flex-col md:flex-row md:!gap-y-4">
      <div className="flex flex-col gap-x-2">
        {/* @ts-expect-error Server Component */}
        <Bio />
        {/* @ts-expect-error Server Component */}
        <Name />
      </div>
      <div className="flex flex-col gap-x-2 md:w-[40%]">
        {/* @ts-expect-error Server Component */}
        <Roster />
        <Contact />
      </div>
    </div>
  );
}
