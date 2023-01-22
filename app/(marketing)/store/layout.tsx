export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cart = [];
  return (
    <div className="flex h-full w-full flex-col items-center justify-start md:px-[10rem] xl:px-[20rem]">
      {/* <div className="flex flex-row justify-between"></div> */}
      {children}
    </div>
  );
}
