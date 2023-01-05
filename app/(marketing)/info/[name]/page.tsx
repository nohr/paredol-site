import { notFound } from "next/navigation";
import { getRoster } from "../Roster";
import { Person } from "./Person";

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
  return <Person name={params.name} member={member} />;
}
