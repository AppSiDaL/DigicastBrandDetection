import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface YTPlayerProps {
  ytRef: React.RefObject<HTMLVideoElement>;
  recorder: any;
  setRecorder: React.Dispatch<React.SetStateAction<any>>;
}

function YTPlayer({ ytRef }: YTPlayerProps) {
  const playerRef = useRef(null);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    const fullUrl = new URL(window.location.href);
    const videoUrl = fullUrl.searchParams.get("url");
    setUrl(videoUrl || "");
  }, []);

  return (
    <div>
      <ReactPlayer
        muted
        width="100vw"
        height="100vh"
        url={url}
        playing={true}
        ref={playerRef}
      />
    </div>
  );
}

export default YTPlayer;
