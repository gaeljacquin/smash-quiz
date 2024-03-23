import type { SyntheticEvent } from "react";

export function handleLoadStart(event: SyntheticEvent<HTMLAudioElement>): void {
  const audioElement = event.target as HTMLAudioElement;
  audioElement.volume = 0.7; // Set the volume to 70%
}

type AudioProps = {
  src: string,
  started?: boolean,
  setStarted?: (arg0: boolean) => void,
  handleStart?: () => void,
  handlePlayPause?: () => void,
  audioRef: any,
}

export function Audio({ src, started, setStarted, handleStart, handlePlayPause, audioRef }: AudioProps) {
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
