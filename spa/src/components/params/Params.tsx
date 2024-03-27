import { Button } from "../ui/button";
import ModelParams from "./ModelParams";
import Uploader from "./Uploader";
import URLInput from "./URLInput";
import WebCam from "./WebCam";
import { useNavigate } from "react-router-dom";

interface ParamsProps {
  spechResponse: any;
  setSpechResponse: any;
  imageRef: React.RefObject<HTMLImageElement>;
  cameraRef: React.RefObject<HTMLVideoElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ytRef: React.RefObject<HTMLImageElement>;
  streaming: string | null;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  recorder: any;
  setRecorder: React.Dispatch<React.SetStateAction<any>>;
  confidence: number;
  setConfidence: React.Dispatch<React.SetStateAction<number>>;
  confidenceRef: any;
  object: string;
  setObject: React.Dispatch<React.SetStateAction<string>>;
}

export default function Params({
  confidence,
  setConfidence,
  spechResponse,
  setSpechResponse,
  imageRef,
  setUrl,
  recorder,
  setRecorder,
  url,
  ytRef,
  cameraRef,
  videoRef,
  canvasRef,
  streaming,
  setStreaming,
  confidenceRef,
  object,
  setObject,
}: ParamsProps) {
  const divStyle = {
    margin: "10px",
  };
  const navigator = useNavigate();
  return (
    <div style={{ maxHeight: "100%", overflow: "auto" }}>
      <div style={{ ...divStyle }}>
        <ModelParams
          object={object}
          setObject={setObject}
          confidenceRef={confidenceRef}
          confidence={confidence}
          setConfidence={setConfidence}
        />
      </div>
      <div style={{ ...divStyle }}>
        <Uploader
          setStreaming={setStreaming}
          streaming={streaming}
          imageRef={imageRef}
          canvasRef={canvasRef}
          videoRef={videoRef}
          cameraRef={cameraRef}
        />
      </div>
      <div style={{ ...divStyle }}>
        <URLInput
          spechResponse={spechResponse}
          setSpechResponse={setSpechResponse}
          url={url}
          recorder={recorder}
          setRecorder={setRecorder}
          setUrl={setUrl}
          setStreaming={setStreaming}
          streaming={streaming}
          ytRef={ytRef}
          canvasRef={canvasRef}
        />
      </div>
      <div style={{ ...divStyle }}>
        <WebCam
          setStreaming={setStreaming}
          streaming={streaming}
          cameraRef={cameraRef}
        />
      </div>
      <div style={{ ...divStyle }}>
        <Button variant="destructive" onClick={() => setStreaming("none")}>
          Stop
        </Button>
      </div>
      <div style={{ ...divStyle }}>
        <Button variant="link" onClick={() => navigator("/look")}>
          Go To Look
        </Button>
      </div>
    </div>
  );
}
