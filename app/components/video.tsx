import type { SyntheticEvent } from "react";

export function handleLoadStart(event: SyntheticEvent<HTMLVideoElement>): void {
  const videoElement = event.target as HTMLVideoElement;
  videoElement.volume = 0.2; // Set the volume to 20%
}

type VideoProps = {
  src: string,
  format?: string
}

export function Video({ src, format = 'mp4' }: VideoProps) {
  return (
    <video width="1080" height="720" controls autoPlay onLoadStart={handleLoadStart} preload="none">
      <source src={src} type={"video/" + format} />
      Your browser does not support the video tag.
    </video>
  )
}