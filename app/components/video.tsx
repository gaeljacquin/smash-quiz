import type { SyntheticEvent } from "react";

export function handleLoadStart(event: SyntheticEvent<HTMLVideoElement>): void {
  const videoElement = event.target as HTMLVideoElement;
  videoElement.volume = 0.7; // Set the volume to 70%
}

type VideoProps = {
  src: string,
  format?: string
}

export function Video({ src, format = 'mp4' }: VideoProps) {
  return (
    <video
      width="640"
      height="480"
      controls
      controlsList="nodownload nocast"
      autoPlay
      onLoadStart={handleLoadStart}
      preload="metadata"
      disablePictureInPicture
    >
      <source src={src} type={"video/" + format} />
      Your browser does not support the video tag.
    </video>
  )
}
