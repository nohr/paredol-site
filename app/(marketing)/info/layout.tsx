export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-auto w-full justify-start self-center py-2 md:w-full md:justify-center ">
      <div className="pb-24 md:pb-0"> {children}</div>
    </div>
  );
}
