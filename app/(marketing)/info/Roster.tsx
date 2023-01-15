import { CgSpinner } from "react-icons/cg";
import { Suspense } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "@api/firebase.config";
import { state } from "state";
import { RosterLink } from "./RosterLink";

export async function getRoster(name?: string) {
  state.loading = true;
  const docRef = doc(db, "info", "roster");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    state.loading = false;
    if (name) return docSnap.data()[`${name}`];
    else return docSnap.data();
  }
}

export default async function Roster() {
  const roster = await getRoster();

  // reorder roster by name
  const orderedRoster = Object.keys(roster)
    .map((key) => ({ key, ...roster[key] }))
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <div className="flex flex-col gap-y-2 p-3">
      <h1 className="title self-center md:self-start">The crew...</h1>
      <div className="flex flex-col justify-start gap-y-4">
        <Suspense fallback={<CgSpinner className="h-8 w-auto animate-spin" />}>
          <>
            {orderedRoster.map((member, index) => (
              <RosterLink key={index} member={member} />
            ))}
          </>
        </Suspense>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-y-2 p-3">
  //     <h1 className="title">The roster...</h1>
  //     {/* map roster */}

  //     {orderedRoster &&
  //       orderedRoster.map((key) => (
  //         <div key={key} className="flex flex-col justify-center">
  //           <Link
  //             href={`info/${key}`}
  //             className="link flex !w-[75%] flex-row items-center gap-x-3 !p-2"
  //           >
  //             {orderedRoster[key]?.photo && (
  //               <div
  //                 style={{
  //                   backgroundImage: `url(${orderedRoster[key]?.photo})`,
  //                   backgroundSize: "120%",
  //                   backgroundPosition: "center",
  //                 }}
  //                 className={`flex aspect-square w-20 rounded-full`}
  //               ></div>
  //             )}
  //             <p className="h-fit w-full font-bold">
  //               {orderedRoster[key]?.name}
  //             </p>
  //           </Link>
  //           {/* <p>{orderedRoster[key].bio}</p> */}
  //         </div>
  //       ))}
  //   </div>
  // );
}
