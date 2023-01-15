export const dynamic = "auto",
  dynamicParams = true,
  // revalidate = 0,
  fetchCache = "only-no-store",
  runtime = "nodejs",
  preferredRegion = "auto";

import { notFound } from "next/navigation";
import { getRoster } from "../Roster";
import { MemberBio } from "./Member.bio";
import { MemberData } from "./Member.data";

export async function generateStaticParams() {
  const roster = Object.keys(await getRoster());
  return roster.map((name: any) => ({
    name: name,
  }));
}

export default async function MemberPage({
  params,
}: {
  params: { name: string };
}) {
  const member = await getRoster(params.name);
  if (!member) return notFound();

  return (
    <div className="flex h-full w-full flex-col gap-8 md:flex-row md:pb-0 lg:mx-24 2xl:!mx-96">
      <MemberData member={member} name={params.name} />

      <MemberBio bio={member.bio} name={params.name} />
    </div>
  );
}
