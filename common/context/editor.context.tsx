"use client";

import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export interface dataProps {
  current: {
    name: string;
    date: any;
    category: string;
    client: string;
    description: string;
    program: string[];
    url: string;
    cover: string;
    content: { type: string; url: string; caption: string; id: string }[];
    published: boolean;
  };
}

interface EditorContextProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  date: any;
  setDate: Dispatch<SetStateAction<any>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  client: string;
  setClient: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  program: string[];
  setProgram: Dispatch<SetStateAction<string[]>>;
  url: string;
  setURL: Dispatch<SetStateAction<string>>;
  published: boolean;
  setPublished: Dispatch<SetStateAction<boolean>>;
  lot: string;
  setLot: Dispatch<SetStateAction<string>>;
  titles: string[];
  setTitles: Dispatch<SetStateAction<string[]>>;
  content: { type: string; url: string; caption: string; id: string }[];
  setContent: Dispatch<
    SetStateAction<{ type: string; url: string; caption: string; id: string }[]>
  >;
  cover: string;
  setCover: Dispatch<SetStateAction<string>>;
  saved: boolean;
  setSaved: Dispatch<SetStateAction<boolean>>;
}

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

export const EditorProvider = ({ children }: { children?: ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [lot, setLot] = useState<string>("");
  const [titles, setTitles] = useState<string[]>([]);
  const [content, setContent] = useState<
    { type: string; url: string; caption: string; id: string }[]
  >([]);
  const [cover, setCover] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [date, setDate] = useState<any>("");
  const [category, setCategory] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [program, setProgram] = useState<string[]>([]);
  const [url, setURL] = useState<string>("");
  const [published, setPublished] = useState<boolean>(false);

  return (
    <EditorContext.Provider
      value={{
        name,
        setName,
        date,
        setDate,
        category,
        setCategory,
        client,
        setClient,
        description,
        setDescription,
        program,
        setProgram,
        url,
        setURL,
        published,
        setPublished,
        lot,
        setLot,
        titles,
        setTitles,
        content,
        setContent,
        cover,
        setCover,
        saved,
        setSaved,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

interface EditorConsumerProps {
  children: any;
}

export const EditorConsumer = ({ children }: EditorConsumerProps) => (
  <EditorContext.Consumer>
    {({
      name,
      setName,
      date,
      setDate,
      category,
      setCategory,
      client,
      setClient,
      description,
      setDescription,
      program,
      setProgram,
      url,
      setURL,
      published,
      setPublished,
      lot,
      setLot,
      titles,
      setTitles,
      content,
      setContent,
      cover,
      setCover,
      saved,
      setSaved,
    }) =>
      children({
        name,
        setName,
        date,
        setDate,
        category,
        setCategory,
        client,
        setClient,
        description,
        setDescription,
        program,
        setProgram,
        url,
        setURL,
        published,
        setPublished,
        lot,
        setLot,
        titles,
        setTitles,
        content,
        setContent,
        cover,
        setCover,
        saved,
        setSaved,
      })
    }
  </EditorContext.Consumer>
);
