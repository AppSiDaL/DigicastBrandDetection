import Video from "./components/video/Video";
import Params from "./components/params/Params";
import Results from "./components/Results";
import Spech from "./components/Spech";
import { useRef, useState } from "react";

export default function App() {
  const [streaming, setStreaming] = useState<string | null>(null); // streaming state
  const [url, setUrl] = useState<string>("");
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ytRef = useRef(null);
  const border = {
    border: "2.5px",
    borderColor: "#5C5C5C",
    borderStyle: "solid",
    borderRadius: 5,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 10,
          width: "30%",
          height: "100%",
          ...border,
          marginRight: 5,
        }}
      >
        <Params
          url={url}
          setUrl={setUrl}
          ytRef={ytRef}
          setStreaming={setStreaming}
          streaming={streaming}
          imageRef={imageRef}
          canvasRef={canvasRef}
          videoRef={videoRef}
          cameraRef={cameraRef}
        />
      </div>
      <div style={{ width: "70%", height: "100%", ...border, marginLeft: 5 }}>
        <div>
          <Video
            url={url}
            ytRef={ytRef}
            setStreaming={setStreaming}
            streaming={streaming}
            imageRef={imageRef}
            canvasRef={canvasRef}
            videoRef={videoRef}
            cameraRef={cameraRef}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            ...border,
            margin: 10,
          }}
        >
          <div style={{ ...border, margin: 10 }}>
            <Results />
          </div>
          <div style={{ ...border, margin: 10 }}>
            <Spech />
          </div>
        </div>
      </div>
    </div>
  );
}