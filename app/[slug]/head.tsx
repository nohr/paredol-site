import PWATags from "../components/interface/PWATags";

export default async function Head({ params }: { params: { slug: string } }) {
  const title = `${params.slug} @ Paredol`;

  return (
    <>
      <PWATags />
      <title>{title}</title>
    </>
  );
}
