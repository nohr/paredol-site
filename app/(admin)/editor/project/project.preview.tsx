import { Key, useContext, useEffect } from "react";
import {
  handleDeleteContent,
  handleGetContent,
} from "../../../../api/editor.api";
import { EditorContext } from "../../../../common/editor.context";

export default function Preview() {
  const { content, setContent, name, IDs, setCover } =
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
    if (IDs.indexOf(name) !== -1) {
      // get the data from the database
      handleGetContent(name, setContent);
    }
  }, [name, IDs, setContent]);

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
      <div className="previewContent" key={id}>
        <>
          {type === "image" ? (
            <img src={url} alt={name} key={id} />
          ) : type === "video" ? (
            <video src={url} key={id} controls></video>
          ) : (
            <p>{type} type not supported</p>
          )}
        </>
        <p>{caption}</p>
        <button
          className={`delete`}
          style={{ width: "min-content" }}
          onClick={() => handleDeleteContent(item, name, content, setContent)}
          type="button"
        >
          Delete {type}
        </button>
      </div>
    );
  }
  return (
    <div className="slideshow">
      {content.length > 0 &&
        content.map((value: any, index: Key) => (
          <GenerateElement item={value} key={index} />
        ))}
      {(!content || content.length === 0) &&
        `Upload and click 'Add Image' to preview.`}
    </div>
  );
}
