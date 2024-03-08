import React from "react";
import BoundingBoxes from "./BoundingBoxes";
import BoundingBoxesVideo from "../BoundingBoxesVideo/Index";
interface InferenceCardProps {
  response: any;
  imageURL: string | undefined; // Update the type to allow for undefined values
  source: string;
}

export default function InferenceCard({
  response,
  imageURL,
  source,
}: InferenceCardProps) {
  return (
    <div
      className="border-dashed border-2 border-sky-500 m-0.5 w-5/11"
      style={source === "image" ? { width: 1000 } : {}}
    >
      {source === "image" ? (
        <BoundingBoxes
          response={response}
          imageURL={imageURL ? imageURL : ""}
        />
      ) : (
        <BoundingBoxesVideo
          response={response}
          videoURL={imageURL ? imageURL : ""}
        />
      )}
    </div>
  );
}
