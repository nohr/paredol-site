import { useRef } from "react";

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div>
      <input ref={inputRef} />
      <button type="submit">Save</button>
    </div>
  );
};
