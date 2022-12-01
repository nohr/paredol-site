import { FirestoreDocument } from "./Document";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string };
}) {
  const { slug } = params;
  const { id } = searchParams;
  console.log(slug, id);
  return (
    <>
      <FirestoreDocument slug={slug} />
      {/* {searchParams && <p>{searchParams.id}</p>} */}
    </>
  );
}
