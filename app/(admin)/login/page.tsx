"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../../../api/firebase.config";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { state } from "../../../common/state";

const URL = [
  "http://localhost:1027/",
  "http://192.168.1.6:1027/",
  "https://paredol.com/",
];

const login = (email: string) =>
  sendSignInLinkToEmail(auth, email, {
    url: `http://localhost:1027/login`,
    handleCodeInApp: true,
  })
    .then(() => window.localStorage.setItem("emailForSignIn", email))
    .catch((error) => error);

export default function LoginPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const email = useRef<HTMLInputElement>(null!);
  state.loading = false;
  if (user) router.push("/editor");
  else {
    useEffect(() => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email: string =
          window.localStorage.getItem("emailForSignIn") || "N/A";
        if (email === "N/A")
          window.prompt("Please provide your email for confirmation");
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            // console.log(result);
          })
          .catch((error) => error);
      }
    }, []);

    return (
      <>
        <h1>Be excused</h1>
        <div className="m-0 flex h-full w-full flex-col items-center justify-center gap-y-[5px] px-[10px] py-[0px]">
          <p>Sign in to your account</p>
          <input required type="email" placeholder="Email" ref={email} />
          <button
            type="button"
            onClick={() =>
              sendSignInLinkToEmail(auth, email.current.value, {
                url: `http://localhost:1027/login`,
                handleCodeInApp: true,
              })
                .then(() =>
                  window.localStorage.setItem(
                    "emailForSignIn",
                    email.current.value
                  )
                )
                .catch((error) => error)
            }
          >
            Sign in
          </button>
          <p>or</p>
          <button style={{ width: "fit-content" }} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </>
    );
  }
}
