import PWATags from "@ui/PWATags";

export default async function Head({ params }: { params: { name: string } }) {
  const title = `${params.name} @ Paredol`;

  return (
    <>
      <PWATags />
      <title>{title}</title>
    </>
  );
}
