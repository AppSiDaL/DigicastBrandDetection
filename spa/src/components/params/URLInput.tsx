import { Card, CardContent } from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa6";
import { cardStyle, colors } from "@/utils";
import { Label } from "../ui/label";
import { CiLink } from "react-icons/ci";
import { Input } from "../ui/input";
import { useState } from "react";

interface UploaderProps {
  ytRef: any;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  streaming: string | null;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function URLInput({
  url,
  setUrl,
  ytRef,
  canvasRef,
  streaming,
  setStreaming,
}: UploaderProps) {
  const [streamingURL, setStreamingURL] = useState<string>(""); // streaming state
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
              <FaArrowRight
                size={40}
                color="gray"
                onClick={() => {
                  setUrl(streamingURL);
                }}
              />
            )}
            <Input
              type="text"
              placeholder="Paste URL"
              onChange={(e) => {
                setStreamingURL(e.target.value);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
