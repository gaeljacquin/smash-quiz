import type { Clip } from "@/interfaces/clip";

export default function selectClip(clips: Clip[], lastClipId: number) {
  const filteredClips = clips.filter(clip => clip.id !== lastClipId);
  const randomClipId = Math.floor(Math.random() * filteredClips.length);

  return filteredClips[randomClipId];
}
