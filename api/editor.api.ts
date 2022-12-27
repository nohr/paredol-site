import {
  collection,
  deleteDoc,
  doc,
  getDoc,
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
} from "firebase/storage";
import { v4 } from "uuid";
import { db, storage } from "./firebase.config";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { getAuth } from "firebase/auth";
import { getData } from "./firebase.api";
import { dataProps } from "../common/editor.context";
// import { convertToWebp } from '../common';

export async function handleAddContent(
  selectedFiles: any,
  name: any,
  setLoad: (arg0: string) => void,
  content: any,
  setContent: any,
  caption: any,
  orientation: any,
  setIsFilePicked: (arg0: boolean) => void,
  fileInput: { current: { value: string } }
) {
  let uploadTask = null;
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
    const storageRef = ref(
      storage,
      `projects/${name} Media/${id}-${file.name}`
    );
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
          ref(storage, `projects/${name} Media/${id}-${file.name}`)
        ).then((downloadURL) => {
          handleSetContent(
            name,
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
  name: string,
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
    doc(db, "projects", name),
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
  name: string,
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
  deleteObject(ref(storage, `projects/${name} Media/${item.name}`));
  // remove the item from the content array
  setContent(content.filter((i: any) => i !== item));
  // update the firestore doc
  setDoc(
    doc(db, "projects", name),
    {
      content: content.filter((i: any) => i !== item),
    },
    { merge: true }
  );
}

export async function handleDeletePost(
  lot: string,
  name: any,
  setSaved: (arg0: boolean) => void
) {
  setSaved(true);
  await deleteDoc(doc(db, "projects", lot));
  // delete firebase storage folder
  listAll(ref(storage, `projects/${name} Media`)).then((res) => {
    res.items.forEach((itemRef) => {
      deleteObject(itemRef);
    });
  });
}

export async function uploadData(
  data: dataProps["current"],
  by: string,
  lot: string
) {
  const {
    name,
    date,
    category,
    client,
    description,
    url,
    program,
    content,
    cover,
    published,
  } = data;

  await setDoc(
    doc(db, "projects", name),
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
  name: string,
  setContent: {
    (
      value: SetStateAction<
        { type: string; url: string; caption: string; id: string }[]
      >
    ): void;
    (arg0: any): void;
  }
) {
  getDoc(doc(db, "projects", name))
    .then((doc) => {
      if (doc.exists()) {
        setContent(doc.data().content);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

export async function fillFormData(
  data: {}[],
  IDs: string | any[],
  name: string
) {
  if (IDs.indexOf(name) !== -1) {
    const docSnap = await getDoc(doc(db, "projects", name));
    if (docSnap.exists()) {
      data.push(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
}

export async function getFormLists(
  setIDs: Dispatch<SetStateAction<string[]>>,
  setCategories: Dispatch<SetStateAction<string[]>>
) {
  const data = await getDocs(collection(db, "projects"));
  setIDs(data.docs.map((doc) => doc.id));
  setCategories([...new Set(data.docs.map((doc) => doc.data().category))]);
}

export function getType(client: string) {
  if (client === "Nabla" || client === "NYU" || client === "Nohri") {
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
  data: Object,
  nameInput: MutableRefObject<HTMLInputElement>,
  dataList: MutableRefObject<HTMLDataListElement>,
  setIsFilePicked: Dispatch<SetStateAction<boolean>>,
  setSelectedFiles: Dispatch<SetStateAction<FileList | undefined>>
) {
  if (nameInput.current) {
    nameInput.current.value = "";

    setSelectedFiles(undefined);
    setIsFilePicked(false);

    let options = dataList.current.options;

    for (var i = 0; i < options.length; i++) {
      options[i].selected = false;
    }
  }
}

export function handleUploadPost(
  data: {
    name: string;
    published: boolean;
    date: any;
    client: string;
    category: string;
    description: string;
    url: string;
    program: string[];
  },
  setSaved: Dispatch<SetStateAction<boolean>>,
  setContent: Dispatch<
    SetStateAction<{ type: string; url: string; caption: string; id: string }[]>
  >
) {
  const { name, date, client, category } = data;
  if (name !== "" && category !== "" && client !== "" && date !== "") {
    let by = getCreator();
    let lot = generateLot(client, name, date);
    // uploadData(data, by, lot);
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
