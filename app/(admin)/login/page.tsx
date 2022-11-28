export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../../firebase/config";

function signInWithGoogle() {
  signInWithPopup(getAuth(app), new GoogleAuthProvider());
}

export function LoginButton() {
  return (
    <div className="container">
      <h1>Be excused</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default function LoginPage() {
  return <LoginButton />;
}
