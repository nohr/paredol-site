"use client";

import React, { createContext } from "react";
export { default } from "./editor.context";
export const EditorContext = createContext<EditorContextProps>({
  name: "",
  setName: () => {},
  date: "",
  setDate: () => {},
  category: "",
  setCategory: () => {},
  client: "",
  setClient: () => {},
  description: "",
  setDescription: () => {},
  program: [],
  setProgram: () => {},
  url: "",
  setURL: () => {},
  published: false,
  setPublished: () => {},
  lot: "",
  setLot: () => {},
  titles: [],
  setTitles: () => {},
  content: [],
  setContent: () => {},
  cover: "",
  setCover: () => {},
  saved: false,
  setSaved: () => {},
});
