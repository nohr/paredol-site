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
      {slug && (
        <div>
          <h1>Info for {slug}</h1>
        </div>
      )}
      {searchParams && <p>{searchParams.id}</p>}
    </>
  );
}
