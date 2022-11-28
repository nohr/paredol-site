export default function Page({
  params,
  searchParams,
}: {
  params?: { slug: string };
  searchParams?: { id: string };
}) {
  return (
    <>
      {params && <p>{params.slug}</p>}
      {searchParams && <p>{searchParams.id}</p>}
    </>
  );
}
