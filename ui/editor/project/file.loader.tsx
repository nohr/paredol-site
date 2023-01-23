import { handleAddContent } from "@api/editor.api";
import { EditorContext } from "context/editor";
import { useContext, useRef, useState } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
import ProjectEditorPreview from "./project.preview";

export default function FileLoader({ ...props }) {
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
        className="fileInput inputField"
      ></input>
      <div className="fileGroup">
        {isFilePicked ? (
          <input
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            placeholder="Caption"
            className="inputField"
          ></input>
        ) : null}
        {selectedFiles !== undefined &&
        selectedFiles[0] &&
        selectedFiles[0].type.split("/")[0] === "video" ? (
          <input
            onChange={(e) => setOrientaion(e.target.value)}
            type="text"
            placeholder="Orientation"
            className="inputField"
          ></input>
        ) : null}
      </div>
      <div className="addContentWrap">
        <button
          className={`addContent link ${!isFilePicked ? "disabled" : ""}`}
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
