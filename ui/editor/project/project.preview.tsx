import { Key, useContext, useEffect } from "react";
import { handleDeleteContent, handleGetContent } from "@api/editor.api";
import { useSnapshot } from "valtio";
import { state } from "state";
import { EditorContext } from "context/editor";

function ProjectEditorPreview() {
  const { content, setContent, name, lot, titles, setCover } =
    useContext(EditorContext);
  // set the cover image when the content changes
  useEffect(() => {
    if (content.length > 0) {
      // go through the content array, stop and set the first image as the cover
      for (let i = 0; i < content.length; i++) {
        let { type, url } = content[i];
        if (type === "image") {
          setCover(url);
          break;
        }
      }
    } else {
      setCover("");
    }
  }, [content, name, setCover]);

  // Set the preview content when the document matches from the database
  useEffect(() => {
    // Set the content to the data from the database if the name matches an ID
    if (titles.indexOf(name) !== -1) {
      // get the data from the database
      handleGetContent(lot, setContent);
    }
  }, [lot, name, titles, setContent]);

  function GenerateElement({
    item,
  }: {
    item: {
      type: string;
      name: string;
      url: string;
      caption: string;
      id: string;
    };
  }) {
    const { type, name, url, caption, id } = item;
    return (
      <div className="relative flex flex-col gap-y-2" key={id}>
        <>
          {type === "image" ? (
            <img className="h-[50vh] w-auto" src={url} alt={name} key={id} />
          ) : type === "video" ? (
            <video
              className="h-[50vh] w-auto"
              src={url}
              key={id}
              controls
            ></video>
          ) : (
            <p>{type} type not supported</p>
          )}
        </>
        <p className=" z-20">{caption}</p>
        <button
          className={`mb-1 h-min w-fit !appearance-none self-center rounded-md !bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none`}
          onClick={() => handleDeleteContent(item, lot, content, setContent)}
          type="button"
        >
          Delete {type}
        </button>
      </div>
    );
  }
  return (
    <div className=" flex h-[90%] w-full flex-row flex-nowrap items-center gap-x-4 overflow-x-scroll ">
      {content.length > 0 &&
        content.map((value: any, index: Key) => (
          <GenerateElement item={value} key={index} />
        ))}
      {(!content || content.length === 0) &&
        `Upload and click 'Add Image' to preview.`}
    </div>
  );
}

export default ProjectEditorPreview;
