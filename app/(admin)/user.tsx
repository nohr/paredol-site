"use client";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { state } from "../../common/state";
import { useRouter } from "next/navigation";

const logout = () => {
  signOut(auth);
};

export function CurrentUser() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    state.loading = true;
    return (
      <>
        <p>Initialising User...</p>
      </>
    );
  } else if (user) {
    state.loading = false;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button onClick={logout}>Log out</button>
        <h1>Hi, {user.displayName?.split(" ")[0]}</h1>
      </div>
    );
  } else {
    router.push("/login");
    return (
      <>
        <p>Not logged in</p>
      </>
    );
  }
}
