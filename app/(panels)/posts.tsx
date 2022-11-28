import Link from "next/link";

export const Posts = () => {
  const links = [
    "post1",
    "post2",
    "post3",
    "post4",
    "post5",
    "post6",
    "post7",
    "post8",
  ];
  return (
    <div className="navigator panel">
      {links.map((link, index) => (
        <Link href={`/${link}`} key={index}>
          {link}
        </Link>
      ))}
    </div>
  );
};
