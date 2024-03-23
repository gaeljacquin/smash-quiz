import type { RefObject, SyntheticEvent } from "react";

export function handleLoadStart(event: SyntheticEvent<HTMLAudioElement>): void {
  const audioElement = event.target as HTMLAudioElement;
  audioElement.volume = 0.7; // Set the volume to 70%
}

type AudioProps = {
  src: string,
  handlePlayPause?: () => void,
  audioRef: RefObject<HTMLAudioElement>,
}

export function Audio({ src, handlePlayPause, audioRef }: AudioProps) {
  return (
    <audio
      ref={audioRef}
      controls
      controlsList="nodownload nocast"
      onPlay={handlePlayPause}
      onLoadStart={handleLoadStart}
      src={src}
    />
  )
}
