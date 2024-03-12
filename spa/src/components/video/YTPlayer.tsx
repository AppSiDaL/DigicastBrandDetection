import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface YTPlayerProps {
  ytRef: React.RefObject<ReactPlayer>;
}

function YTPlayer({ ytRef }: YTPlayerProps) {
  const playerRef = useRef(null);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    async function startCapture() {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "never" },
        audio: false,
      });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      setRecorder(mediaRecorder);
    }
    startCapture();
  }, []);

  const handlePlay = () => {
    if (recorder) {
      recorder.start();
      recorder.addEventListener("dataavailable", (evt) => {
        const url = URL.createObjectURL(evt.data);
        console.log(url);
        if (ytRef.current) {
          ytRef.current.src = url;
          // Liberar el objeto URL cuando el video se haya cargado
          ytRef.current.onloadeddata = () => {
            URL.revokeObjectURL(url);
          };
        }
      });
    }
  };

  const handleStop = () => {
    if (recorder) {
      recorder.stop();
      // Liberar los recursos del stream de video
      recorder.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=5LhIt9der6g"
        ref={playerRef}
        onPlay={handlePlay}
        onPause={handleStop}
        onStop={handleStop}
      />
      <br />
    </div>
  );
}

export default YTPlayer;
