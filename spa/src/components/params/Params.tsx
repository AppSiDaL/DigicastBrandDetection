import ModelParams from "./ModelParams";
import Uploader from "./Uploader";
import URLInput from "./URLInput";
import WebCam from "./WebCam";

interface ParamsProps {
  imageRef: React.RefObject<HTMLImageElement>;
  cameraRef: React.RefObject<HTMLVideoElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ytRef: React.RefObject<HTMLImageElement>;
  streaming: string | null;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Params({
  imageRef,
  setUrl,
  url,
  ytRef,
  cameraRef,
  videoRef,
  canvasRef,
  streaming,
  setStreaming,
}: ParamsProps) {
  const divStyle = {
    margin: "10px",
  };
  return (
    <div>
      <div style={{ ...divStyle }}>
        <ModelParams />
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
          url={url}
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
    </div>
  );
}
