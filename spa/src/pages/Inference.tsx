import Video from "../components/video/Video";
import Params from "../components/params/Params";
import Results from "../components/Results";
import Spech from "../components/Spech";
import { useRef, useState } from "react";

interface UploaderProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  ytRef: any;
  recorder: any;
  setRecorder: React.Dispatch<React.SetStateAction<any>>;
}
export default function Inference({ url, setUrl, ytRef,recorder,setRecorder }: UploaderProps) {
  const [streaming, setStreaming] = useState<string | null>(null); // streaming state
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const resultsRef = useRef(null);
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
          recorder={recorder}
          setRecorder={setRecorder}
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
          resultsRef={resultsRef}
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
            width: "100%",
            height: "50%",
          }}
        >
          <div style={{ ...border, margin: 10,width:"50%",height:"100%" }}>
            <Results resultsRef={resultsRef}/>
          </div>
          <div style={{ ...border, margin: 10,width:"50%",height:"100%" }}>
            <Spech />
          </div>
        </div>
      </div>
    </div>
  );
}
