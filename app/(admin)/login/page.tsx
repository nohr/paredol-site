"use client";
function signInWithGoogle() {
  console.log("Signing in with Google...");
}

function LoginButton() {
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

export default function LoginPage() {
  return (
    <div className="container">
      <h1>Be excused</h1>
      return <LoginButton />
    </div>
  );
}
