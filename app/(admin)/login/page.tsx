"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signInWithGoogle } from "../../../firebase/config";
import { useRouter } from "next/navigation";

export interface IInputWrapperProps {
  label?: string;
  required?: boolean;
  minimizedLabel?: boolean;
  description?: string;
  error?: string;
  wrapperStyle?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
}

export default function LoginPage() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  if (user) {
    router.push("/editor");
  }
  return (
    <div className="container">
      <h1>Be excused</h1>
      <button style={{ width: "50%" }} onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
