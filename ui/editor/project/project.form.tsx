"use client";

import { useContext, useRef, useState } from "react";
import {
  clearSelectedName,
  handleDeletePost,
  handleUploadPost,
} from "@api/editor.api";
import { EditorContext } from "context/editor";
import FileLoader from "./file.loader";
import MetadataLoader from "./metadata.loader";

export function ProjectEditorForm() {
  const nameInput = useRef<HTMLInputElement>(null!);
  const dataList = useRef<HTMLDataListElement>(null!);
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
    content,
    setContent,
    cover,
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
