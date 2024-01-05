import Image from "next/image";
import React from "react";
interface ImageUploadedProps {
  selectedFile: File | null;
}
export default function ImageUploaded({ selectedFile }: ImageUploadedProps) {
  return (
    <div>
      {selectedFile && (
        <Image
          src={URL.createObjectURL(selectedFile)}
          width="200"
          height="200"
          alt="Selected"
        />
      )}
    </div>
  );
}
