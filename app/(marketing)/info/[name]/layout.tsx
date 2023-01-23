"use client";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex !w-full flex-col">
      <div className=" flex h-full pb-32 md:mx-8 md:justify-center md:pb-0">
        {children}
      </div>
    </div>
  );
}
