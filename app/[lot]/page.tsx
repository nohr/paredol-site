import { getData } from "api";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getData();

  return projects.map((project: any) => ({
    lot: project.lot,
  }));
}

export default async function Page(param: { params: { lot: string } }) {
  const project = await getData(param.params.lot);
  if (!project) return notFound();
  return <Project project={project} />;
}

function Project({ ...props }) {
  // check the data array for the object with the matching lot

  const { category, client, name, type, description, content, by, lot } =
    props.project;
  return (
    <div className="flex h-full w-full flex-col items-center justify-start lg:px-12 ">
      {/* Metadata */}
      <div className="2flex w-full flex-col items-start justify-center gap-y-2 md:mx-7 md:grid md:h-60 md:grid-cols-[2fr_1fr] md:grid-rows-[1fr]">
        <div className="md:w-full">
          <p className="text-xs font-black uppercase">{`[${lot}]`}</p>
          <h1 className="title">{name}</h1>
          {client ? (
            <p className="font-thin">{`${
              client === "NYU" || client === "Paredol"
                ? `${type} ${category} `
                : `${category} for ${client}`
            }`}</p>
          ) : null}
        </div>
        <div className="relative h-auto overflow-y-auto md:max-w-prose">
          {description ? (
            <p className="description">{`"${description}" - ${by}`}</p>
          ) : null}
        </div>
      </div>
      {/* carosel */}
      <div className="carousel-center carousel rounded-box h-full w-full space-x-4 bg-white bg-opacity-70 p-4 dark:bg-black dark:bg-opacity-70 md:max-w-[80%]">
        {content &&
          content?.map((value: any, index: number) => (
            <Content value={value} key={index} />
          ))}
      </div>
    </div>
  );
}

function Content({ ...props }) {
  const { value } = props;
  const { url, name, type, caption } = value;
  return (
    <>
      {type === "image" ? (
        <div className="carousel-item relative h-auto w-96 overflow-hidden">
          <Image
            src={url}
            fill
            alt={name}
            className="rounded-md shadow-md"
            style={{ objectFit: "cover" }}
          />
          {caption ? (
            <p className="absolute bottom-0 w-full bg-white bg-opacity-70 p-1 text-xs backdrop-blur-md dark:bg-black dark:bg-opacity-70">
              {caption}
            </p>
          ) : null}
        </div>
      ) : type === "video" ? (
        <div className="carousel-item relative h-auto w-40 overflow-hidden">
          <video
            className="rounded-md shadow-md"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={url} type="video/mp4" /> Your browser does not support
            the video tag. I suggest you upgrade your browser.
          </video>
          {caption ? (
            <p className="absolute bottom-0 w-full bg-white bg-opacity-70 p-1 text-xs backdrop-blur-md dark:bg-black dark:bg-opacity-70">
              {caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
