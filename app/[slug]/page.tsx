"use client";

import { state } from "state";
import { useSnapshot } from "valtio";

export interface PageProps {
  params?: { slug: string };
  searchParams?: any;
}

export default function Page({ params, searchParams }: PageProps) {
  const slug = params?.slug;
  // const id = searchParams?.id;
  const { data } = useSnapshot(state);

  // check the data array for the object with the matching slug
  const d = data.find((doc: any) => doc.lot === slug);
  const { cover, category, client, name, date, description, lot, content } = d;

  return (
    <>
      <h1 className="title">{name}</h1>
      <img src={cover} alt={name} />
      <p className="description">{client}</p>
      <p className="description">{category}</p>
      <p className="description">{description}</p>
    </>
  );
}
