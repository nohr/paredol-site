import React from "react";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "../firebase/config";
import { Navigator } from "./(panels)/navigator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <FirebaseAppProvider firebaseConfig={firebaseConfig}> */}
        <Navigator />
        {children}
        {/* </FirebaseAppProvider> */}
      </body>
    </html>
  );
}
