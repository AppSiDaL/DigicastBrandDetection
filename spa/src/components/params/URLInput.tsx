import { Card, CardContent } from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa6";
import { cardStyle, colors } from "@/utils";
import { Label } from "../ui/label";
import { CiLink } from "react-icons/ci";
import { Input } from "../ui/input";

interface UploaderProps {
  ytRef: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  streaming: string | null;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  recorder: any;
  setRecorder: React.Dispatch<React.SetStateAction<any>>;
}

export default function URLInput({
  url,
  setUrl,
  ytRef,
  recorder,
  setRecorder,
  streaming,
  setStreaming,
}: UploaderProps) {
  const handlePlay = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {},
      audio: false,
    });
    if (ytRef.current) {
      ytRef.current.srcObject = stream;
    }
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    setRecorder(mediaRecorder);
    mediaRecorder.start();
    mediaRecorder.addEventListener("dataavailable", (evt) => {
      const streamUrl = URL.createObjectURL(evt.data);
      if (ytRef.current) {
        ytRef.current.src = streamUrl;
        ytRef.current.onloadeddata = () => {
          URL.revokeObjectURL(streamUrl);
        };
      }
    });
    if (streaming === null || streaming === "image") {
      ytRef.current.style.display = "block"; // show camera
      setStreaming("yt"); // set streaming to camera
    }
  };
  const handleClick = () => {
    const URL =
      window.location.protocol +
      "//" +
      window.location.host +
      "/video" +
      "?url=" +
      url;
    window.open(URL, "_blank");
    if (streaming === null || streaming === "image") {
      ytRef.current.style.display = "block"; // show camera
      setStreaming("yt"); // set streaming to camera
    }
    handlePlay();
  };

  const handleStop = () => {
    if (recorder) {
      recorder.stop();
      // Liberar los recursos del stream de video
      recorder.stream.getTracks().forEach((track:any) => track.stop());
    }
  };

  return (
    <Card style={{ ...cardStyle, display: "flex", justifyContent: "center" }}>
      <CardContent>
        <div style={{ margin: 5 }}>
          <Label style={{ textTransform: "uppercase", color: colors.label }}>
            Pegar URL de la imagen o video
          </Label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {url === "" ? (
              <CiLink size={40} color="gray" />
            ) : (
              <FaArrowRight size={40} color="gray" onClick={handleClick} />
            )}
            <Input
              type="text"
              placeholder="Paste URL"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={handleStop}>Detener</button>
      </CardContent>
    </Card>
  );
}
