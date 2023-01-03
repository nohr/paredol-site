"use client";

import { getData } from "@api/firebase.api";
import { useEffect, useState } from "react";

export interface PageProps {
  params?: { slug: string };
  searchParams?: any;
}

export default function Page({ params, searchParams }: PageProps) {
  const slug = params?.slug;
  // const id = searchParams?.id;
  // check the data array for the object with the matching slug
  const [project, setProject] = useState<any>({
    cover: "",
    category: "",
    client: "",
    name: "",
    date: "",
    description: "",
    lot: "",
    content: "",
  });

  useEffect(() => {
    (async () => setProject(await getData(slug)))();
  }, []);

  const { cover, category, client, name, date, description, lot, content } =
    project;

  return (
    <>
      <h1 className="title">{name}</h1>
      {lot != "" ? (
        <p className="text-xs font-black uppercase">{`[${lot}]`}</p>
      ) : null}
      <img src={cover} alt={name} />
      <p className="description">{client}</p>
      <p className="description">{category}</p>
      <p className="description">{description}</p>
    </>
  );
}
