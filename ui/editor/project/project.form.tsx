"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import {
  clearSelectedName,
  fillFormData,
  getFormLists,
  handleAddContent,
  handleDeletePost,
  handleUploadPost,
} from "@api/editor.api";
import { EditorContext } from "@context/editor.context";
import { state } from "state";
import ProjectEditorPreview from "./project.preview";
import { Program } from "../../program";

export function ProjectEditorForm() {
  const nameInput = useRef<HTMLInputElement>(null!);
  const dataList = useRef<HTMLDataListElement>(null!);
  const fileInput = useRef<HTMLInputElement>(null!);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileList>();
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
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
    content,
    setContent,
    cover,
    setCover,
    saved,
    setSaved,
  } = useContext(EditorContext);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex h-min w-full flex-col justify-evenly gap-y-5 rounded-md border-[1px] border-blue-900 bg-white p-4 backdrop-blur-lg dark:border-blue-200 dark:bg-black md:h-full md:justify-start "
    >
      <MetadataLoader
        setSelectedFiles={setSelectedFiles}
        setIsFilePicked={setIsFilePicked}
      />
      <FileLoader
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        isFilePicked={isFilePicked}
        setIsFilePicked={setIsFilePicked}
      />
      <button
        className={`submit ${isFilePicked ? "disabled" : ""}`}
        disabled={isFilePicked}
        type="button"
        onClick={() =>
          handleUploadPost(
            setSaved,
            setContent,
            name,
            category,
            client,
            description,
            program,
            url,
            published,
            date,
            content,
            cover,
            lot
          )
        }
      >
        {titles.indexOf(name) === -1 ? "Upload" : "Save"} Post
      </button>
      {titles.indexOf(name) !== -1 && (
        <button
          className={`${confirm ? "submit" : "delete"}`}
          onClick={() => setConfirm(!confirm)}
          type="button"
        >
          {confirm ? "Cancel" : "Delete Post"}
        </button>
      )}
      {confirm ? (
        <button
          className={`delete`}
          onClick={() => {
            handleDeletePost(lot, setSaved);
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
          }}
          type="button"
        >
          Confirm
        </button>
      ) : null}
    </form>
  );
}

function MetadataLoader({ ...props }) {
  const nameInput = useRef<HTMLInputElement>(null!);
  const dataList = useRef<HTMLDataListElement>(null!);
  const [programs, setPrograms] = useState<string[]>([]);
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
  const { data } = useSnapshot(state);

  // Hide mobile keyboard on selection
  useEffect(() => {
    if (titles.indexOf(name) !== -1 && nameInput.current)
      nameInput.current.blur();
  }, [name, titles, nameInput]);

  // Get and List document id and categories in datalist
  useEffect(() => {
    getFormLists(data, setTitles, setCategories);
  }, [data, setTitles, setCategories]);

  // Populate form with data from firestore when name matches
  useEffect(() => {
    if (titles.indexOf(name) !== -1) {
      data.length > 0 &&
        fillFormData(
          name,
          data,
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
  }, [name, data]);

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
          className="name"
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
        required
      ></input>
      <input
        onChange={(e) => setClient(e.target.value)}
        value={client}
        type="text"
        placeholder="Client"
      ></input>
      <input
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        list="categories"
        type="text"
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
        className="desc"
        placeholder="Description"
      ></textarea>
      <input
        onChange={(e) => setURL(e.target.value)}
        value={url}
        type="text"
        placeholder="Project URL"
      ></input>
      <input
        onChange={(e) => setTempProgram(e.target.value)}
        value={tempProgram}
        type="text"
        placeholder="Add Program"
      ></input>
      <button
        type="button"
        onClick={() => {
          tempProgram !== "" && data.program.push(tempProgram);
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

function FileLoader({ ...props }) {
  const { selectedFiles, setSelectedFiles, isFilePicked, setIsFilePicked } =
    props;
  const { mobile } = useSnapshot(state);
  const fileInput = useRef<HTMLInputElement>(null!);
  const [load, setLoad] = useState<string>("5MB Max");
  const [caption, setCaption] = useState<string>("");
  const [orientation, setOrientaion] = useState<string>("");
  const { lot, content, setContent } = useContext(EditorContext);
  return (
    <div className="third flex flex-col gap-y-5">
      Images
      {mobile ? <ProjectEditorPreview /> : null}
      <input
        onChange={(e) => {
          if (e.target.files) {
            e.target.files.length > 0
              ? setIsFilePicked(true)
              : setIsFilePicked(false);
            setSelectedFiles(e.target.files);
            console.log(e.target.files[0].type);
          }
        }}
        multiple
        type="file"
        ref={fileInput}
        className="fileInput"
      ></input>
      <div className="fileGroup">
        {isFilePicked ? (
          <input
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Caption"
          ></input>
        ) : null}
        {selectedFiles !== undefined &&
        selectedFiles[0] &&
        selectedFiles[0].type.split("/")[0] === "video" ? (
          <input
            onChange={(e) => setOrientaion(e.target.value)}
            type="text"
            placeholder="Orientation"
          ></input>
        ) : null}
      </div>
      <div className="addContentWrap">
        <button
          className={`addContent ${!isFilePicked ? "disabled" : ""}`}
          type="button"
          onClick={() => {
            handleAddContent(
              selectedFiles,
              lot,
              setLoad,
              content,
              setContent,
              caption,
              orientation,
              setIsFilePicked,
              fileInput
            );
            setCaption("");
            setOrientaion("");
          }}
        >
          Add Content
        </button>
        <p>{load === "5MB Max" ? `${load}` : `${load} uploaded`}</p>
      </div>
    </div>
  );
}
