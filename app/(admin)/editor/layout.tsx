import { CurrentUser } from "../user";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CurrentUser />
      {children}
    </>
  );
}
