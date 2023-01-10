"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export function Project({ ...props }) {
  const { category, client, name, type, description, content, by, lot, url } =
    props.project;

  // handle modal state and content
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[fit-content_max-content] flex-col items-center justify-start gap-y-3 overflow-y-scroll md:flex md:w-fit md:grid-rows-[1fr_3fr] lg:px-12">
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
      <div className="flex w-full flex-col items-start justify-center !gap-y-3 md:mx-0 md:grid md:h-60 md:grid-cols-[2fr_1fr] md:grid-rows-[1fr]">
        <div className="flex flex-col gap-y-1 md:w-full">
          <p className="text-xs font-black uppercase">{`[${lot}]`}</p>
          <h1 className="title">{name}</h1>
          {client ? (
            <p className="font-thin">{`${
              client === "NYU" || client === "Paredol"
                ? `${type} ${category} `
                : `${category} for ${client}`
            }`}</p>
          ) : null}
          {url ? (
            !url.includes("paredol.com/store") ? (
              <a
                href={url}
                target="_blank"
                className="fill link !w-fit py-2"
                rel="noreferrer"
              >
                View Project
              </a>
            ) : (
              <Link href="/store" className="fill link !w-fit py-2">
                Visit Store
              </Link>
            )
          ) : null}
        </div>
        <div className="relative overflow-y-auto md:max-w-prose">
          {description ? (
            <p className=" h-2/4">{`"${description}" - ${by}`}</p>
          ) : null}
        </div>
      </div>
      {category !== "Website" ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-2">
          <div className="carousel-center flex h-[40vh] w-full space-x-4 overflow-x-scroll p-4 pb-1 md:max-w-[100%]">
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
          {content && content.length > 1 ? (
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
          ) : null}
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
        <Image alt={name} src={url} fill sizes="100vw" />
      </div>
    );
  }
  return (
    <>
      {type === "image" ? (
        <div
          id={`item${index}`}
          className="carousel-item relative aspect-auto h-auto w-96 overflow-hidden"
        >
          <Image
            src={url}
            fill
            alt={name}
            className="aspect-auto cursor-pointer rounded-md shadow-md"
            style={{ objectFit: "cover" }}
            sizes="100vw"
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
        orientation === "portrait" ? (
          <div
            id={`item${index}`}
            className="carousel-item relative h-fit w-40 overflow-hidden md:w-80"
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
              <p className="absolute bottom-0 w-full bg-white bg-opacity-70 p-1 text-xs backdrop-blur-md dark:bg-black dark:bg-opacity-70">
                {caption}
              </p>
            ) : null}
          </div>
        ) : (
          // Landscape
          <div
            id={`item${index}`}
            className="relative aspect-video h-full w-full"
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
