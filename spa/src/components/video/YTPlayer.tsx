import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface YTPlayerProps {
  ytRef: React.RefObject<HTMLVideoElement>;
  recorder: any;
  setRecorder: React.Dispatch<React.SetStateAction<any>>;
}

function YTPlayer({ ytRef, recorder, setRecorder }: YTPlayerProps) {
  const playerRef = useRef(null);
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    const fullUrl = new URL(window.location.href);
    const videoUrl = fullUrl.searchParams.get("url");
    setUrl(videoUrl || "");
  }, []);
  console.log(ytRef);



  return (
    <div>
      <ReactPlayer
        url={url}
      playing={true}
        ref={playerRef}
      />
    </div>
  );
}

export default YTPlayer;
