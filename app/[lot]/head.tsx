import PWATags from "@ui/PWATags";

export default async function Head({ params }: { params: { lot: string } }) {
  const title = `${params.lot} @ Paredol`;

  return (
    <>
      <PWATags />
      <title>{title}</title>
    </>
  );
}
