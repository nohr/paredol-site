import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore/lite";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "./firebase.config";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { getAuth } from "firebase/auth";
import { getData } from "./api";

export async function handleAddContent(
  selectedFiles: any,
  lot: any,
  setLoad: (arg0: string) => void,
  content: any,
  setContent: any,
  caption: any,
  orientation: any,
  setIsFilePicked: (arg0: boolean) => void,
  fileInput: { current: { value: string } }
) {
  let uploadTask: UploadTask;
  let newContent: never[] = [];
  // handle uploading multiple files with an ordered id
  for (let file of selectedFiles) {
    // check file size
    if (file.size > 5242880) {
      alert("File size is too large. Please upload a file less than 5MB.");
      return;
    }
    // keep track of file upload progress
    let progress = 0;
    // create a unique id for the file
    const id = v4();
    // create a reference to the storage bucket location
    const storageRef = ref(storage, `projects/${lot} Media/${id}-${file.name}`);
    // upload the file
    uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // calculate the upload progress
        progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setLoad(`${progress}%`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(
          ref(storage, `projects/${lot} Media/${id}-${file.name}`)
        ).then((downloadURL) => {
          handleSetContent(
            lot,
            setContent,
            newContent,
            content,
            id,
            file.name,
            file.type,
            downloadURL,
            caption,
            orientation
          );
        });
        setLoad("5MB Max");
        progress = 0;
      }
    );
  }

  setIsFilePicked(false);
  fileInput.current.value = "";
  newContent = [];
}
// wait for the firebase extension to finish and grab the download url
function handleSetContent(
  lot: string,
  setContent: (arg0: any[]) => void,
  newContent: {
    id: any;
    name: string;
    url: any;
    type: any;
    caption: any;
    orientation: any;
  }[],
  content: any,
  id: string,
  filename: any,
  filetype: string,
  downloadURL: string,
  caption: any,
  orientation: any
) {
  // add the file to the array of files with an ordered id
  newContent.push({
    id,
    name: `${id}-${filename}`,
    url: downloadURL,
    type: filetype.split("/")[0],
    caption: caption,
    orientation: orientation,
  });
  // add the new content to the content array
  setContent([...content, ...newContent]);
  // update the firestore document
  setDoc(
    doc(db, "projects", lot),
    { content: [...content, ...newContent] },
    { merge: true }
  );
}

export function handleDeleteContent(
  item: {
    type?: string;
    name: any;
    url?: string;
    caption?: string;
    id?: string;
  },
  lot: string,
  content: any[],
  setContent: {
    (
      value: SetStateAction<
        { type: string; url: string; caption: string; id: string }[]
      >
    ): void;
    (arg0: any): void;
  }
) {
  deleteObject(ref(storage, `projects/${lot} Media/${item.name}`));
  // remove the item from the content array
  setContent((prev) => prev.filter((i: any) => i !== item));
  // update the firestore doc
  setDoc(
    doc(db, "projects", lot),
    {
      content: content.filter((i: any) => i !== item),
    },
    { merge: true }
  );
}

export async function handleDeletePost(
  lot: string,
  setSaved: (arg0: boolean) => void
) {
  await deleteDoc(doc(db, "projects", lot));
  // delete firebase storage folder
  listAll(ref(storage, `projects/${lot} Media`)).then((res) => {
    res.items.forEach((itemRef) => {
      deleteObject(itemRef);
    });
  });
  setSaved(true);
}

export async function uploadData(
  name: string,
  category: string,
  client: string,
  description: string,
  program: string[],
  url: string,
  published: boolean,
  date: any,
  content: any[],
  cover: string,
  by: any,
  lot: string
) {
  // console.log(
  //   name,
  //   category,
  //   client,
  //   description,
  //   program,
  //   url,
  //   published,
  //   date,
  //   content,
  //   cover,
  //   by,
  //   lot
  // );
  await setDoc(
    doc(db, "projects", lot),
    {
      by: by,
      lot: lot,
      published: published,
      name: name.replace(/\//g, ""),
      date: Timestamp.fromMillis(
        new Date(
          date.split("-")[0],
          date.split("-")[1] - 1,
          date.split("-")[2]
        ).getTime()
      ),
      category: category,
      client: client,
      type: getType(client),
      description: description,
      url: url,
      program: program,
      content: content,
      cover: cover,
    },
    { merge: true }
  );
}

// export async function handleGetUser() {
//   const docRef = doc(db, "info", "About");
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     state.about = docSnap.data().text;
//   }
// }

// export async function uploadAbout() {
//   await setDoc(
//     doc(db, "info", "About"),
//     {
//       text: state.about,
//     },
//     { merge: true }
//   );
// }

export async function handleGetContent(
  lot: string,
  setContent: Dispatch<
    SetStateAction<
      {
        type: string;
        url: string;
        caption: string;
        id: string;
      }[]
    >
  >
) {
  let snap = await getDocs(collection(db, "projects"));
  const data = snap.docs.map((doc) => doc.data());
  let projectContent: any = data.filter((item: any) => item.lot === lot)[0];
  if (projectContent) projectContent = projectContent.content;
  if (projectContent) setContent(projectContent);
}

export async function fillFormData(
  name: string,
  setName: Dispatch<SetStateAction<string>>,
  setDate: Dispatch<SetStateAction<any>>,
  setCategory: Dispatch<SetStateAction<string>>,
  setClient: Dispatch<SetStateAction<string>>,
  setDescription: Dispatch<SetStateAction<string>>,
  setProgram: Dispatch<SetStateAction<string[]>>,
  setURL: Dispatch<SetStateAction<string>>,
  setPublished: Dispatch<SetStateAction<boolean>>,
  setLot: Dispatch<SetStateAction<string>>
) {
  // get all projects from firestore
  const querySnapshot = await getDocs(collection(db, "projects"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  // check the data array if the name matches and populate the form
  const project = data.filter((item: any) => item["name"] === name)[0];
  if (project) {
    setName(project.name);
    setDate(formatDate(convertDate(project.date)));
    setCategory(project.category);
    setClient(project.client);
    setDescription(project.description);
    setProgram(project.program);
    setURL(project.url);
    setPublished(project.published);
    setLot(project.lot);
  } else {
    console.log("not found");
  }
}

export async function getFormLists(
  setTitles: Dispatch<SetStateAction<string[]>>,
  setCategories: Dispatch<SetStateAction<string[]>>
) {
  // get all projects from firestore
  const querySnapshot = await getDocs(collection(db, "projects"));
  const data = querySnapshot.docs.map((doc) => doc.data());
  // iterate through the projects and add the project names and categories to the datalist
  const names = data.map((doc: any) => doc.name);
  const categories = data.map((doc: any) => doc.category);
  setTitles(names);
  setCategories(categories);
}

export function getType(client: string) {
  if (client === "Paredol" || client === "NYU" || client === "Nohri") {
    return "Self-Initiated";
  } else {
    return "Client";
  }
}

// Utils

// convert firebase timestamp to date
export const convertDate = (timestamp: { seconds: number }) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleDateString();
};

export function clearSelectedName(
  nameInput: MutableRefObject<HTMLInputElement>,
  dataList: MutableRefObject<HTMLDataListElement>,
  setIsFilePicked: Dispatch<SetStateAction<boolean>>,
  setSelectedFiles: Dispatch<SetStateAction<FileList | undefined>>,
  setName: Dispatch<SetStateAction<string>>,
  setDate: Dispatch<SetStateAction<any>>,
  setCategory: Dispatch<SetStateAction<string>>,
  setClient: Dispatch<SetStateAction<string>>,
  setDescription: Dispatch<SetStateAction<string>>,
  setProgram: Dispatch<SetStateAction<string[]>>,
  setURL: Dispatch<SetStateAction<string>>,
  setPublished: Dispatch<SetStateAction<boolean>>,
  setLot: Dispatch<SetStateAction<string>>,
  setContent: Dispatch<
    SetStateAction<{ type: string; url: string; caption: string; id: string }[]>
  >
) {
  setSelectedFiles(undefined);
  setIsFilePicked(false);
  setName("");
  setDate("");
  setCategory("");
  setClient("");
  setDescription("");
  setProgram([]);
  setURL("");
  setPublished(false);
  setLot("");
  setContent([]);

  if (nameInput.current) {
    nameInput.current.value = "";

    let options = dataList.current.options;

    for (var i = 0; i < options.length; i++) {
      options[i].selected = false;
    }
  }
}

export function handleUploadPost(
  setSaved: Dispatch<SetStateAction<boolean>>,
  setContent: Dispatch<
    SetStateAction<{ type: string; url: string; caption: string; id: string }[]>
  >,
  name: string,
  category: string,
  client: string,
  description: string,
  program: string[],
  url: string,
  published: boolean,
  date: string,
  content: {
    type: string;
    url: string;
    caption: string;
    id: string;
  }[],
  cover: string,
  lot?: string
) {
  if (name !== "" && category !== "" && client !== "" && date !== "") {
    const by = getCreator();
    if (!lot) lot = generateLot(client, name, date);
    uploadData(
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
      by,
      lot
    );
    getData();
    setContent([]);
    setSaved(true);
  }
}

// export a function that changes the the string extension to a webp extension
export function convertToWebp(url: string) {
  let newUrl = url.split(".");
  newUrl[newUrl.length - 2] += "_1080x1080";
  newUrl[newUrl.length - 1] = "webp";
  return newUrl.join(".");
}

//convert mm/dd/yyyy to yyyy-mm-dd
export function formatDate(date: string | number | Date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

// Generate a lot number for the project
export function generateLot(
  client: string,
  name: string,
  date: string | number | Date
) {
  let by = getCreator();
  console.log(new Date(date).getMonth());
  const d = new Date(date).getFullYear().toString().slice(2, 5);
  const m = new Date(date).getMonth() + 1;
  console.log(d + m);
  return (
    client.slice(0, 2).toUpperCase() +
    (d + m) +
    name.slice(0, 2).toUpperCase() +
    by.slice(0, 1)
  );
}

function getCreator() {
  let name = getAuth().currentUser?.displayName;
  // get the initials of the name
  let initials: any = name?.match(/\b\w/g);
  initials = (
    (initials?.shift() || "") + (initials?.pop() || "")
  ).toUpperCase();
  return initials;
}
