import { ReactNode, useState } from "react";
import { EditorContext } from ".";

function EditorProvider({ children }: { children?: ReactNode }) {
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
}

export default EditorProvider;
