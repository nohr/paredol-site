import PWATags from "../../components/interface/PWATags";

async function getPost(slug: string) {
  // const res = await fetch("...");
  // return res.json();
  return slug;
}

export default async function Head({ params }: { params: { slug: string } }) {
  const title = `${await getPost(params.slug)} @ Paredol`;

  return (
    <>
      <PWATags />
      <title>{title}</title>
    </>
  );
}
