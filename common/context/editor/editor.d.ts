
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
