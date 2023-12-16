"use client"
import React, { useState } from "react";
import FileInput from "../components/Test/FileInput";
import ShowJSON from "../components/Test/ShowJSON";
import fileService from "../services/file";

export default function page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const loadImageBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleUpload = async () => {
    const image = await loadImageBase64(selectedFile);

    if (selectedFile) {
      const response = await fileService.testImage(image);
      setResponse(response);
      console.log(response);
    }
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo antes de enviar.");
      return;
    }
  };
  return (
    <>
      <FileInput
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        handleUpload={handleUpload}
      />
      <ShowJSON response={response} />
    </>
  );
}
