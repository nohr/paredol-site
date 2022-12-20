"use client";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../api/firebase.config";
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
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <h1>Hi, {user.displayName?.split(" ")[0]}</h1>
        <button onClick={logout} style={{ width: "80px", height: "40px" }}>
          Log out
        </button>
      </div>
    );
  } else {
    router.replace("/login");
    return <></>;
  }
}
