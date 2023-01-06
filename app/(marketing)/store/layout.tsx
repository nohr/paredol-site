export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cart = [];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* <div className="flex flex-row justify-between"></div> */}
      {children}
    </div>
  );
}
