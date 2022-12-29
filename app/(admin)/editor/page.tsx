// "use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../api/firebase.config";

export default function EditPage() {
  // const [user] = useAuthState(auth);
  // const router = useRouter();
  // if (!user) router.push("/login");
  return (
    <div>
      <Link href="/editor/project">edit a project</Link>
      <br />
      <Link href="/editor/info">edit info</Link>
    </div>
  );
}
