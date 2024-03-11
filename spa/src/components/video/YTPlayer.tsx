import { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";

function YTPlayer() {
  const playerRef = useRef(null);
  const videoRef = useRef(null);
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
        if (videoRef.current) {
          videoRef.current.src = url;
          // Liberar el objeto URL cuando el video se haya cargado
          videoRef.current.onloadeddata = () => {
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
      <video ref={videoRef} controls />
    </div>
  );
}

export default YTPlayer;
