import React from "react";
import { FirestoreCollection } from "./Collection";

export default function HomePage() {
  return (
    <div>
      <h1>Paredol</h1>
      <FirestoreCollection />
    </div>
  );
}
