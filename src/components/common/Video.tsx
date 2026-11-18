import MuxPlayer from "@mux/mux-player-react";

export default function Player() {
  return (
    <MuxPlayer
      playbackId="9UqaxhBjrf6M9qQ3yOkWWQLCvgQ94aENq601JG4YUeec"
      streamType="on-demand"
      autoPlay="muted"
      className="w-full max-w-[500px]"
      onPlay={() => console.log("Video started")}
    />
  );
}