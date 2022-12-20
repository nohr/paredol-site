import { FirestoreDocument } from "../../api/Document";

export interface PageProps {
  params?: { slug: string };
  searchParams?: any;
}

export default function Page({ params, searchParams }: PageProps) {
  const slug = params?.slug;
  const id = searchParams?.id;
  console.log(slug, id);
  return (
    <>
      {slug && <FirestoreDocument path={slug} />}
      {searchParams && <p>{searchParams.id}</p>}
    </>
  );
}
