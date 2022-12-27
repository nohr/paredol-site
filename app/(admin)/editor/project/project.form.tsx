export {};
// "use client";

// import React, {
//   Dispatch,
//   SetStateAction,
//   useContext,
//   useEffect,
//   //   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { useSnapshot } from "valtio";
// import {
//   clearSelectedName,
//   fillFormData,
//   getFormLists,
//   handleUploadPost,
// } from "../../../../api/editor.api";
// import {
//   EditorConsumer,
//   EditorContext,
// } from "../../../../common/editor.context";
// import { state } from "../../../../common/state";
// import Preview from "./project.preview";

// export function ProjectEditor({
//   setSaved,
// }: {
//   setSaved: Dispatch<SetStateAction<boolean>>;
// }) {
//   const { mobile } = useSnapshot(state);
//   const nameInput = useRef<HTMLInputElement | undefined>();
//   const dataList = useRef<HTMLInputElement>(null!);
//   const fileInput = useRef<HTMLInputElement>(null!);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedFiles, setSelectedFiles] = useState<FileList>();
//   const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
//   const [load, setLoad] = useState<string>("5MB Max");
//   const [confirm, setConfirm] = useState<boolean>(false);
//   const { name, setName, data, IDs, setIDs, setContent } =
//     useContext(EditorContext);
//   const addProgram = useRef("");
//   const contentData = useRef({
//     caption: "",
//     orientation: "",
//     url: "",
//   });

//   // Hide mobile keyboard on selection
//   useEffect(() => {
//     if (IDs.indexOf(name) !== -1 && nameInput.current) nameInput.current.blur();
//   }, [name, IDs, nameInput]);

//   // Get and List document id and categories in datalist
//   useEffect(() => {
//     getFormLists(setIDs, setCategories);
//   }, [setIDs, setCategories]);

//   // Populate form with data from firestore when name matches
//   useEffect(() => {
//     fillFormData(data.current, IDs, name);
//   }, [name, IDs]);

//   useEffect(() => {
//     return () => {
//       setName("");
//       clearSelectedName(
//         data,
//         nameInput.current,
//         dataList,
//         setIsFilePicked,
//         setSelectedFiles
//       );
//       setContent([]);
//     };
//   }, [setContent, setName]);

//   return (
//     <EditorConsumer>
//       {(
//         name: string,
//         setName: Dispatch<SetStateAction<string>>,
//         data: {
//           current: {
//             name: string;
//             published: boolean;
//             date: string;
//             client: string;
//             category: string;
//             description: string;
//             url: string;
//             program: string[];
//             cover: string;
//             content: {
//               type: string;
//               url: string;
//               caption: string;
//               id: string;
//               orientation: string;
//             }[];
//           };
//         },
//         IDs: string | any[]
//       ) => (
//         <form onSubmit={(e) => e.preventDefault()} className="secondary">
//           <div className="section">
//             Metadata
//             <div className="nameGroup">
//               <input
//                 onChange={(e) => {
//                   setName(e.target.value);
//                   data.current.name = e.target.value;
//                 }}
//                 list="names"
//                 type="text"
//                 placeholder="Name"
//                 className="name"
//                 required
//               ></input>
//               <input
//                 type="checkbox"
//                 id="published"
//                 name="published"
//                 className="published"
//                 onChange={(e) => (data.current.published = e.target.checked)}
//               ></input>
//             </div>
//             <button
//               type="button"
//               onClick={() =>
//                 clearSelectedName(
//                   data,
//                   nameInput,
//                   dataList,
//                   setIsFilePicked,
//                   setSelectedFiles
//                 )
//               }
//             >
//               Clear
//             </button>
//             {/* <datalist id="names" ref={dataList}>
//           {IDs.map((name, index) => (
//             <option value={name} key={index} />
//           ))}
//         </datalist> */}
//             <input
//               onChange={(e) => (data.current.date = e.target.value)}
//               type="date"
//               required
//             ></input>
//             <input
//               onChange={(e) => (data.current.client = e.target.value)}
//               type="text"
//               placeholder="Client"
//             ></input>
//             <input
//               onChange={(e) => (data.current.category = e.target.value)}
//               list="categories"
//               type="text"
//               placeholder="Category"
//               required
//             ></input>
//             <datalist id="categories" ref={dataList}>
//               {categories.map((category, index) => (
//                 <option value={category} key={index} />
//               ))}
//             </datalist>
//             <textarea
//               onChange={(e) => (data.current.description = e.target.value)}
//               className="desc"
//               placeholder="Description"
//             ></textarea>
//             <input
//               onChange={(e) => (data.current.url = e.target.value)}
//               type="text"
//               placeholder="Project URL"
//             ></input>
//             <input
//               onChange={(e) => (addProgram.current = e.target.value)}
//               type="text"
//               placeholder="Add Program"
//             ></input>
//             <button
//               type="button"
//               onClick={() => {
//                 addProgram.current !== "" &&
//                   data.current.program.push(addProgram.current);
//                 addProgram.current = "";
//               }}
//             >
//               Add Program
//             </button>
//             {data.current.program.length === 0 && (
//               <ul>
//                 {data.current.program.map((program: any, index: number) => (
//                   <li
//                     key={index}
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       data.current.program.filter(
//                         (item: any) => item !== program
//                       );
//                     }}
//                   >
//                     {program}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div className="section third">
//             Images
//             {mobile && <Preview />}
//             <input
//               onChange={(e) => {
//                 if (e.target.files) {
//                   e.target.files.length > 0
//                     ? setIsFilePicked(true)
//                     : setIsFilePicked(false);
//                   setSelectedFiles(e.target.files);
//                   console.log(e.target.files[0].type);
//                 }
//               }}
//               multiple
//               type="file"
//               ref={fileInput}
//               className="fileInput"
//             ></input>
//             <div className="fileGroup">
//               {isFilePicked ? (
//                 <input
//                   onChange={(e) =>
//                     (contentData.current.caption = e.target.value)
//                   }
//                   type="text"
//                   placeholder="Caption"
//                 ></input>
//               ) : null}
//               {selectedFiles !== undefined &&
//               selectedFiles[0] &&
//               selectedFiles[0].type.split("/")[0] === "video" ? (
//                 <input
//                   onChange={(e) =>
//                     (contentData.current.orientation = e.target.value)
//                   }
//                   type="text"
//                   placeholder="Orientation"
//                 ></input>
//               ) : null}
//             </div>
//             <div className="addContentWrap">
//               <button
//                 className={`addContent ${!isFilePicked ? "disabled" : ""}`}
//                 type="button"
//                 onClick={() => {
//                   //   handleAddContent(
//                   //     selectedFiles,
//                   //     name,
//                   //     setLoad,
//                   //     content,
//                   //     setContent,
//                   //     caption,
//                   //     orientation,
//                   //     setIsFilePicked,
//                   //     fileInput
//                   //   );
//                   contentData.current.caption = "";
//                 }}
//               >
//                 Add Content
//               </button>
//               <p>{load === "5MB Max" ? `${load}` : `${load} uploaded`}</p>
//             </div>
//           </div>
//           <button
//             className={`submit ${isFilePicked ? "disabled" : ""}`}
//             onClick={() =>
//               handleUploadPost(
//                 data.current,
//                 content,
//                 cover,
//                 setSaved,
//                 setContent
//               )
//             }
//             disabled={isFilePicked}
//             type="submit"
//           >
//             {IDs.indexOf(data.current.name) === -1 ? "Upload" : "Save"} Post
//           </button>
//           {IDs.indexOf(data.current.name) !== -1 && (
//             <button
//               className={`${confirm ? "submit" : "delete"}`}
//               onClick={() => setConfirm(!confirm)}
//               type="button"
//             >
//               {confirm ? "Cancel" : "Delete Post"}
//             </button>
//           )}
//           {confirm && (
//             <button
//               className={`delete`}
//               //   onClick={() => {
//               //     handleDeletePost(name, setSaved);
//               //     clearSelectedName(
//               //       nameInput,
//               //       dataList,
//               //       setName,
//               //       setChecked,
//               //       setCategory,
//               //       setClient,
//               //       setDescription,
//               //       setDate,
//               //       setProgram,
//               //       setProgramArray,
//               //       setContent,
//               //       setIsFilePicked,
//               //       setURL,
//               //       setSelectedFiles
//               //     );
//               //   }}
//               type="button"
//             >
//               Confirm
//             </button>
//           )}
//         </form>
//       )}
//     </EditorConsumer>
//   );
// }
