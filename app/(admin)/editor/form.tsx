import { useRef } from "react";

export const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h1>Form</h1>
    </div>
  );
};
