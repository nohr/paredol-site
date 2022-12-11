import PWATags from "../(misc)/PWATags";

async function getPost(slug: string) {
  // const res = await fetch("...");
  // return res.json();
  return { title: slug };
}

export default async function Head({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <>
      <PWATags />
      <title>{post.title} @ Paredol</title>
    </>
  );
}
