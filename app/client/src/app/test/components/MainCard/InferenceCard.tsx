import React from "react";
import BoundingBoxes from "./BoundingBoxes";
interface InferenceCardProps {
  response: any;
  imageURL: string | undefined; // Update the type to allow for undefined values
}

export default function InferenceCard({
  response,
  imageURL,
}: InferenceCardProps) {
  return (
    <div className="border-dashed border-2 border-sky-500 w-11/12 m-0.5 h-auto">
      <BoundingBoxes response={response} imageURL={imageURL ? imageURL : ""} />
    </div>
  );
}
