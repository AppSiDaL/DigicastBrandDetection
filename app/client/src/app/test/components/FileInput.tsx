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
          accept=".mp4,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
        <br />
        <br />
        <button
          className="border-2 border-slate-50"
          onClick={handleUpload}
        >
          Probar Modelo
        </button>
      </div>
    </>
  );
}
