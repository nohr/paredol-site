import Link from "next/link";

export default function EditPage() {
  return (
    <div>
      <Link href="/editor/project">edit a project</Link>
      <br />
      <Link href="/editor/info">edit info</Link>
    </div>
  );
}
