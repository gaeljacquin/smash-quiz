import type { Clip } from "@/interfaces/clip";

export default function selectClip(clips: Clip[], lastClipId: number, newSession: boolean) {
  let filteredClips;

  if (newSession) {
    filteredClips = clips.filter(clip => clip.id !== lastClipId);
  } else {
    filteredClips = clips;
  }

  const randomClipId = shuffleClips(filteredClips);

  return filteredClips[randomClipId];
}

// Utility function to shuffle an array (Fisher-Yates shuffle)
function shuffleClips(list: Clip[]) {
  const shuffledClips = [...list]

  for (let i = shuffledClips.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const shift: Clip = shuffledClips[i];
    shuffledClips[i] = shuffledClips[j]!;
    shuffledClips[j] = shift;
  }

  return shuffledClips[0].id;
}
