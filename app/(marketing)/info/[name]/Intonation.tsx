import { storage } from "@api/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import { HiSpeakerWave } from "react-icons/hi2";
import { state } from "state";

// export a function that grabs the intonation from storage
async function getIntonation(slug: string) {
  const url = await getDownloadURL(
    ref(storage, `info/roster/${slug}/intonation.mp3`)
  );
  return url;
}

export function Intonation({ name }: any) {
  // get the intonation from the database and play it with the audio tag
  const play = async () => {
    const audio = new Audio(await getIntonation(name));
    audio.play();
    audio.addEventListener("loadstart", () => (state.loading = true));
    audio.addEventListener("loadeddata", () => (state.loading = false));
  };

  return (
    <>
      <HiSpeakerWave
        className="fill link !h-auto !w-8  !cursor-pointer"
        title="Pronounce"
        onClick={() => {
          play();
        }}
      />
    </>
  );
}
