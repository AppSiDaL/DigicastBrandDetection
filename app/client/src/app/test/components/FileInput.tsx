"use client";
import Image from "next/image";
import React, { ChangeEvent } from "react";
interface FileInputProps {
  setSelectedFile: (file: File | null) => void;
  handleUpload: () => void;
  selectedFile: File | null;
}
export default function FileInput({
  setSelectedFile,
  handleUpload,
  selectedFile,
}: FileInputProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <>
      <div>
        <input
          type="file"
          accept=".m4,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <button
          style={{ borderColor: "white", borderWidth: 1 }}
          onClick={handleUpload}
        >
          Enviar Archivo
        </button>
      </div>
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
    </>
  );
}
