// import { CurrentUser } from "../login/page";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <CurrentUser /> */}
      {children}
    </div>
  );
}
