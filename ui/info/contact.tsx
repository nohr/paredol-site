"use client";

import { FormEvent, useRef, useState } from "react";
import { BsFillPersonFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { BiMailSend } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import { sendContactForm } from "@api/api";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null!);
  const name = useRef<HTMLInputElement>(null!);
  const email = useRef<HTMLInputElement>(null!);
  const message = useRef<HTMLTextAreaElement>(null!);
  const [result, setResult] = useState(
    "Send a message to our email and we’ll get back to you asap!"
  );

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const submitContact = async (e) => {
    e.preventDefault();
    if (!validateEmail(email.current.value)) {
      setResult("Please enter a valid email address");
      return;
    }
    console.log(e);
    const res = await sendContactForm({
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    });
    if (res == 0) {
      setResult("Thank you for your message!");
      form.current.reset();
    } else {
      setResult("Something went wrong! Please try again");
    }
  };

  return (
    <div className="flex flex-col gap-y-2 self-center p-3">
      <h1 className="title self-center md:self-start">The start...</h1>
      <p className="text-xs font-semibold !italic md:pl-4">{result}</p>
      <form
        ref={form}
        onSubmit={submitContact}
        className="flex w-full flex-col gap-y-4 p-2"
      >
        <div className="flex w-full flex-col gap-x-2 gap-y-2 md:flex-row">
          <div className="flex w-full flex-row  items-center gap-x-2">
            <BsFillPersonFill className="w-4" />
            <input
              ref={name}
              name="from_name"
              type="text"
              required
              placeholder="Your name..."
              className="fill inputField link !w-full p-2"
            />
          </div>
          <div className="flex w-full flex-row items-center gap-x-2 invalid:border-red-600 invalid:text-red-600">
            <MdAlternateEmail className="w-4" />
            <input
              ref={email}
              name="from_email"
              type="email"
              required
              placeholder="Your email..."
              className="fill inputField link !w-full p-2"
            />
          </div>
        </div>
        <div className="flex flex-row items-start gap-x-2">
          <BsFillChatDotsFill className="mt-2 w-4" />
          <textarea
            ref={message}
            name="message"
            required
            placeholder="Your thoughts..."
            className="fill inputField !h-40 !w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="fill link !flex !w-fit gap-x-2 self-center justify-self-center border-[1px] md:!border-blue-900 md:dark:!border-blue-200"
        >
          <BiMailSend />
          Send
        </button>
      </form>
    </div>
  );
}
