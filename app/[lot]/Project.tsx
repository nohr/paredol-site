import Image from "next/image";
import Link from "next/link";

export function Project({ ...props }) {
  const { category, client, name, type, description, content, by, lot, url } =
    props.project;
  return (
    <div className="grid h-full w-full grid-cols-[100%] grid-rows-[fit-content_max-content] flex-col  items-center justify-start overflow-y-scroll md:flex md:w-fit md:grid-rows-[1fr_3fr] lg:px-12">
      {/* Metadata */}
      <div className="2flex w-full flex-col items-start justify-center gap-y-2 md:mx-0 md:grid md:h-60 md:grid-cols-[2fr_1fr] md:grid-rows-[1fr]">
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
              <a href={url} target="_blank" className="fill link py-2">
                View Project
              </a>
            ) : (
              <Link href="/store" className="fill link py-2">
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
      {/* carosel */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 py-2">
        <div className="carousel-center rounded-box flex h-[40vh] w-full space-x-4 overflow-x-scroll bg-white bg-opacity-70 p-4 pb-1 dark:bg-black dark:bg-opacity-70 md:h-full md:max-w-[80%]">
          {content &&
            content?.map((value: any, index: number) => (
              <Content value={value} key={index} index={index} />
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
    </div>
  );
}

function Content({ ...props }) {
  const { value, index } = props;
  const { url, name, type, caption, orientation } = value;
  return (
    <>
      {type === "image" ? (
        <div
          id={`item${index}`}
          className="carousel-item relative aspect-auto h-auto w-[inherit] overflow-hidden"
        >
          <Image
            src={url}
            fill
            alt={name}
            className="aspect-auto rounded-md shadow-md"
            style={{ objectFit: "cover" }}
            sizes="100vw"
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
