"use client";

import { useEffect } from "react";
import { signOut, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@api/firebase.config";
import { state } from "state";
import { useMounted } from "utils";
import { useUser } from "@api/firebase.api";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!user && !auth) {
        state.loading = false;
      }
    }, [user]);

    useEffect(() => {
      if (!auth.currentUser && !user) router.push("/login");
    }, [user, router]);

    const hasMounted = useMounted();
    if (!hasMounted) return null;
    return (
      <>
        {user ? <UserBar user={user} /> : null}
        {children}
      </>
    );
  }
}
function UserBar({ user }: { user: User }) {
  const logout = () => {
    signOut(auth);
  };
  const path = usePathname();
  return (
    <div className="flex w-full flex-row items-center justify-between p-3">
      <h1 className="!italic">Hi, {user.displayName?.split(" ")[0]}</h1>
      <h3 className="font-thin">
        {path === "/editor" && "Admin Editor"}
        {path === "/editor/project" && "Project Editor"}
      </h3>
      <button
        onClick={logout}
        className="mb-1 h-[32px] w-[80px] !appearance-none rounded-md !bg-red-500 text-xs font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none"
      >
        Log out
      </button>
    </div>
  );
}
