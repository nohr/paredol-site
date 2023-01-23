import { clearSelectedName, fillFormData, getFormLists } from "@api/editor.api";
import { Program } from "@ui/program";
import { EditorContext } from "context/editor";
import { useContext, useEffect, useRef, useState } from "react";

export default function MetadataLoader({ ...props }) {
  const nameInput = useRef<HTMLInputElement>(null!);
  const dataList = useRef<HTMLDataListElement>(null!);
  const [categories, setCategories] = useState<string[]>([]);
  const [tempProgram, setTempProgram] = useState<string>("");
  const { setSelectedFiles, setIsFilePicked } = props;
  const {
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
    setContent,
  } = useContext(EditorContext);

  // Hide mobile keyboard on selection
  useEffect(() => {
    if (titles.indexOf(name) !== -1 && nameInput.current)
      nameInput.current.blur();
  }, [name, titles, nameInput]);

  // Get and List document id and categories in datalist
  useEffect(() => {
    getFormLists(setTitles, setCategories);
  }, [setTitles, setCategories]);

  // Populate form with data from firestore when name matches
  useEffect(() => {
    if (titles.indexOf(name) !== -1) {
      fillFormData(
        name,
        setName,
        setDate,
        setCategory,
        setClient,
        setDescription,
        setProgram,
        setURL,
        setPublished,
        setLot
      );
    }
  }, [name]);

  // Clear the form when it unmounts
  useEffect(() => {
    return () =>
      clearSelectedName(
        nameInput,
        dataList,
        setIsFilePicked,
        setSelectedFiles,
        setName,
        setDate,
        setCategory,
        setClient,
        setDescription,
        setProgram,
        setURL,
        setPublished,
        setLot,
        setContent
      );
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      Metadata {lot !== "" ? `for ${lot}` : null}
      <div className="nameGroup">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          list="names"
          type="text"
          placeholder="Name"
          className="name inputField"
          required
        ></input>
        <input
          type="checkbox"
          id="published"
          name="published"
          className="published"
          onChange={(e) => setPublished(e.target.checked)}
          checked={published}
        ></input>
      </div>
      <button
        type="button"
        className="link"
        onClick={() =>
          clearSelectedName(
            nameInput,
            dataList,
            setIsFilePicked,
            setSelectedFiles,
            setName,
            setDate,
            setCategory,
            setClient,
            setDescription,
            setProgram,
            setURL,
            setPublished,
            setLot,
            setContent
          )
        }
      >
        Clear
      </button>
      <datalist id="names" ref={dataList}>
        {titles.map((name, index) => (
          <option value={name} key={index} />
        ))}
      </datalist>
      <input
        onChange={(e) => setDate(e.target.value)}
        value={date}
        type="date"
        className="inputField"
        required
      ></input>
      <input
        onChange={(e) => setClient(e.target.value)}
        value={client}
        type="text"
        className="inputField"
        placeholder="Client"
      ></input>
      <input
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        list="categories"
        type="text"
        className="inputField"
        placeholder="Category"
        required
      ></input>
      <datalist id="categories" ref={dataList}>
        {categories.map((category, index) => (
          <option value={category} key={index} />
        ))}
      </datalist>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="desc inputField"
        placeholder="Description"
      ></textarea>
      <input
        onChange={(e) => setURL(e.target.value)}
        value={url}
        type="text"
        className="inputField"
        placeholder="Project URL"
      ></input>
      <input
        onChange={(e) => setTempProgram(e.target.value)}
        value={tempProgram}
        type="text"
        className="inputField"
        placeholder="Add Program"
      ></input>
      <button
        className="fill link"
        type="button"
        onClick={() => {
          tempProgram !== "" && setProgram([...program, tempProgram]);
          setTempProgram("");
        }}
      >
        Add Program
      </button>
      {program.length !== 0 && (
        <Program program={program} setProgram={setProgram} />
      )}
    </div>
  );
}
