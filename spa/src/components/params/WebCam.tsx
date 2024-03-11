import { cardStyle, colors } from "@/utils";
import { IoMdCamera } from "react-icons/io";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { IoCloseOutline } from "react-icons/io5";
import { Webcam } from "../../utils/webCam";

interface WebCamProps {
  streaming: string | null;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
  cameraRef: React.RefObject<HTMLVideoElement>;
}

export default function WebCam({
  streaming,
  setStreaming,
  cameraRef,
}: WebCamProps) {
  const webcam = new Webcam(); // webcam handler
  console.log(streaming);
  return (
    <div
      style={{
        ...cardStyle,
        display: "flex",
        justifyContent: "center",
        borderRadius: 7,
      }}
    >
      <Button
        variant="ghost"
        style={{ width: "100%", borderColor: "gray" }}
        onClick={() => {
          if (streaming === null || streaming === "image") {
            webcam.open(cameraRef.current as HTMLVideoElement); // open webcam
            if (cameraRef.current) {
              cameraRef.current.style.display = "block"; // show camera
            }
            setStreaming("camera"); // set streaming to camera
          }
          // closing video streaming
          else if (streaming === "camera") {
            webcam.close(cameraRef.current as HTMLVideoElement);
            if (cameraRef.current) {
              cameraRef.current.style.display = "none";
            }
            setStreaming(null);
          } else
            alert(
              `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
            ); // if streaming video
        }}
      >
        <IoMdCamera size={40} color="gray" />
        {"   "}
        <Label
          style={{
            color: colors.label,
            textTransform: "capitalize",
            marginLeft: 5,
          }}
        >
          PRUEBA CAMARA WEB
        </Label>
      </Button>
      <IoCloseOutline
        size={25}
        style={{ alignSelf: "center" }}
        color="red"
        onClick={() => {
          webcam.close(cameraRef.current as HTMLVideoElement);
          if (cameraRef.current) {
            cameraRef.current.style.display = "none";
          }
          setStreaming(null);
        }}
      />
    </div>
  );
}
