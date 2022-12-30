export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Store</h1>
      {children}
    </>
  );
}
