"use client";

import React, {
  useState,
  useRef,
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
  data: dataProps;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  lot: string;
  setLot: Dispatch<SetStateAction<string>>;
  IDs: string[];
  setIDs: Dispatch<SetStateAction<string[]>>;
  content: { type: string; url: string; caption: string; id: string }[];
  setContent: Dispatch<
    SetStateAction<{ type: string; url: string; caption: string; id: string }[]>
  >;
  cover: string;
  setCover: Dispatch<SetStateAction<string>>;
}

export const EditorContext = createContext<EditorContextProps>({
  data: {
    current: {
      name: "",
      date: "",
      category: "",
      client: "",
      description: "",
      program: [],
      url: "",
      cover: "",
      content: [],
      published: false,
    },
  },
  name: "",
  setName: () => {},
  lot: "",
  setLot: () => {},
  IDs: [],
  setIDs: () => {},
  content: [],
  setContent: () => {},
  cover: "",
  setCover: () => {},
});

export const EditorProvider = ({ children }: { children?: ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [lot, setLot] = useState<string>("");
  const [IDs, setIDs] = useState<string[]>([]);
  const [content, setContent] = useState<
    { type: string; url: string; caption: string; id: string }[]
  >([]);
  const [cover, setCover] = useState<string>("");
  const data = useRef<any>({
    name: "",
    date: "",
    category: "",
    client: "",
    description: "",
    program: [],
    url: "",
    cover: "",
    content: [],
    published: false,
  });

  return (
    <EditorContext.Provider
      value={{
        data: { current: data.current },
        name,
        setName,
        lot,
        setLot,
        IDs,
        setIDs,
        content,
        setContent,
        cover,
        setCover,
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
      data,
      name,
      setName,
      lot,
      setLot,
      IDs,
      setIDs,
      content,
      setContent,
      cover,
      setCover,
    }) =>
      children({
        data,
        name,
        setName,
        lot,
        setLot,
        IDs,
        setIDs,
        content,
        setContent,
        cover,
        setCover,
      })
    }
  </EditorContext.Consumer>
);
