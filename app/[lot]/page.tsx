import { getData } from "api";
import { notFound } from "next/navigation";
import { Project } from "./Project";

export async function generateStaticParams() {
  const projects = await getData();

  return projects.map((project: any) => ({
    lot: project.lot,
  }));
}

export default async function Page(param: { params: { lot: string } }) {
  const project = await getData(param.params.lot);
  if (!project) return notFound();
  return <Project project={project} />;
}
