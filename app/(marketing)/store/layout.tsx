export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cart = [];
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1>Store</h1>
        <p>Cart {cart.length}</p>
      </div>
      {children}
    </>
  );
}
