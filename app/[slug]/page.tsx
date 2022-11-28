// export async function generateStaticParams() {
//   const posts = await getPosts();

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { id: string };
}) {
  const { id } = searchParams;
  const { slug } = params;
  return (
    <>
      <h1>{slug}</h1>
      <p>This is a {slug} page.</p>
      <p>{id}</p>
    </>
  );
}
