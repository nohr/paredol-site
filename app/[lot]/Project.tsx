"use client";

import { Program } from "@ui/program";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineLink } from "react-icons/ai";

export function Project({ ...props }) {
  const {
    category,
    program,
    client,
    name,
    type,
    description,
    content,
    by,
    lot,
    url,
  } = props.project;

  // handle modal state and content
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  // remove https:// from url
  const urlNoProtocol = url.replace(/(^\w+:|^)\/\//, "");
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[1fr_4fr] flex-col items-start justify-start gap-y-3 overflow-y-scroll pb-32 md:flex md:w-[unset] md:grid-rows-[1fr_3fr] md:pb-0 lg:px-12">
      {/* Modal */}
      {modal && modalContent ? (
        <div className="absolute top-0 left-0 z-50 h-full w-full">
          <div className="flex h-full w-full flex-col items-center justify-center">
            {modalContent}
            <button
              className="absolute top-3 right-3 z-[70] rounded-full border-white bg-black p-4 dark:border-black dark:bg-white"
              onClick={() => {
                setModal(false);
                setModalContent(null);
              }}
            >
              <IoCloseSharp className="h-8 w-auto fill-white dark:fill-black" />
            </button>
          </div>
        </div>
      ) : null}
      {/* Metadata */}
      <div className="flex w-full flex-col items-start justify-center !gap-y-3 md:mx-0 md:grid md:h-60 md:grid-cols-[1fr_1fr] md:grid-rows-[1fr]">
        {/* Left */}
        <div className="flex w-full flex-row flex-wrap  justify-between gap-x-3 md:w-fit md:flex-col">
          <div className="flex w-full max-w-fit flex-col items-start justify-center md:gap-y-0">
            {/* LOT */}
            <p className="text-xs font-black uppercase">{`[${lot}]`}</p>
            {/* Title */}
            <h1 className="title">{name}</h1>
            {/* Client */}
            {client ? (
              <p className="font-thin">{`${
                client === "NYU" || client === "Paredol"
                  ? `${type} ${category} `
                  : `${category} for ${client}`
              }`}</p>
            ) : null}
          </div>
          {/* URL and Program */}
          <div className="flex w-full  max-w-fit  flex-col items-end justify-end gap-y-2 md:flex-row md:items-center md:justify-start  md:gap-x-2 md:pt-3">
            <Program program={program} setProgram={undefined} />
            {url ? (
              !url.includes("paredol.com/store") ? (
                <a
                  href={url}
                  target="_blank"
                  className="fill link flex !w-fit  whitespace-pre py-2"
                  rel="noreferrer"
                >
                  <AiOutlineLink /> {urlNoProtocol}
                </a>
              ) : (
                <Link href="/store" className="fill link !w-fit py-2">
                  Visit Store
                </Link>
              )
            ) : null}
          </div>
        </div>
        {/* Right */}
        <div className="relative overflow-y-auto md:max-w-prose">
          {description ? (
            <p className=" h-2/4">{`"${description}" - ${by}`}</p>
          ) : null}
        </div>
      </div>
      {/* Content */}
      {category !== "Website" ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-2">
          <div className="flex h-full flex-col !gap-y-10 overflow-hidden p-1 md:overflow-y-auto ">
            {content &&
              content?.map((value: any, index: number) => (
                <Content
                  value={value}
                  key={index}
                  setModalContent={setModalContent}
                  setModal={setModal}
                  index={index}
                />
              ))}
          </div>
          {/* Carousel Buttons */}
          {/* {content && content.length > 1 ? (
            <div className="flex w-full justify-center gap-2 py-2">
              {content.map((value: any, index: number) => (
                <a
                  href={`#item${index}`}
                  key={index}
                  className="link h-min w-min"
                >
                  {index}
                </a>
              ))}
            </div>
          ) : null} */}
        </div>
      ) : (
        <iframe
          src={url}
          className="h-[420px] w-full overscroll-y-contain md:h-full"
        />
      )}
    </div>
  );
}

function Content({ ...props }) {
  const { value, index, setModalContent, setModal } = props;
  const { url, name, type, caption, orientation } = value;

  function ModalImage() {
    return (
      <div className="relative h-auto w-full">
        <Image alt={name} src={url} fill sizes="100vw" className="" />
      </div>
    );
  }
  return (
    <>
      {type === "image" ? (
        <div
          id={`item${index}`}
          className="relative flex h-auto w-full justify-center"
        >
          <Image
            src={url}
            alt={name}
            className=""
            width={600}
            height={600}
            // onClick={() => {
            //   setModalContent(<ModalImage />);
            //   setModal(true);
            // }}
            // onTouchEnd={() => {
            //   setModalContent(<ModalImage />);
            //   setModal(true);
            // }}
          />
          {caption ? (
            <p className="absolute bottom-0 w-full bg-white bg-opacity-70 p-1 text-xs backdrop-blur-md dark:bg-black dark:bg-opacity-70">
              {caption}
            </p>
          ) : null}
        </div>
      ) : //   TODO: add video styling
      type === "video" ? (
        // portrait
        orientation === "portrait" ? (
          <div
            id={`item${index}`}
            className="carousel-item relative mx-auto h-fit w-40 overflow-hidden md:w-80"
          >
            <video
              className="rounded-md shadow-md"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src={url} type="video/mp4" /> Your browser does not
              support the video tag. I suggest you upgrade your browser.
            </video>
            {caption ? (
              <p className=" absolute bottom-0 w-full bg-white bg-opacity-70 p-1 text-xs backdrop-blur-md dark:bg-black dark:bg-opacity-70">
                {caption}
              </p>
            ) : null}
          </div>
        ) : (
          // Landscape
          <div
            id={`item${index}`}
            className="carousel-item relative !ml-0 aspect-video h-fit w-full"
          >
            <video
              controls
              className="aspect-video rounded-md shadow-md"
              autoPlay={false}
              muted={false}
              playsInline
            >
              <source src={url} type="video/mp4" /> Your browser does not
              support the video tag. I suggest you upgrade your browser.
            </video>
            {caption ? (
              <p className="absolute top-0 w-full bg-white bg-opacity-70 p-1 text-xs backdrop-blur-md dark:bg-black dark:bg-opacity-70">
                {caption}
              </p>
            ) : null}
          </div>
        )
      ) : null}
    </>
  );
}

//  function Modal({  }) {
//   const selected = clip.modalImg;
//   const project = clip.project;

//   const handleClick = (e) => {
//     if (e.target.classList.contains("backdrop")) cloud.modalImg = null;
//   };

//   return (
//     <div className="modalWrapper">
//       {/* <Controls selected={selected} project={project} /> */}
//       <div className="backdrop" onClick={handleClick}>
//         <Content selected={selected} project={project} />
//         {/* <Caption caption={selected.caption} /> */}
//       </div>
//     </div>
//   );
// };
