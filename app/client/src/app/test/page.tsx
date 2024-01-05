"use client";
import React, { useState } from "react";
import FileInput from "./components/FileInput";
import ShowJSON from "./components/ShowJSON";
import fileService from "../services/file";
import NavBar from "../components/NavBar";
import DropDown from "./components/DropDown";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [model, setModel] = useState("roboflow-nestle" as string);
  const loadImageBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const modelsURL = [
    {
      value: "roboflow-nestle",
      url: "https://api.roboflow.com/diego/roboflow-nestle/1/predict",
      label: "Roboflow 3.0 Nestle",
    },
    {
      value: "yolov8-nestle",
      url: "https://api.roboflow.com/diego/roboflow-nestle/1/predict",
      label: "Yolo v8 Nestle",
    },
    {
      value: "roboflow-bimbo",
      url: "https://api.roboflow.com/diego/roboflow-nestle/1/predict",
      label: "Roboflow 3.0 Bimbo",
    },
    {
      value: "yolov8-bimbo",
      url: "https://api.roboflow.com/diego/roboflow-nestle/1/predict",
      label: "Yolo v8 Bimbo",
    },
    {
      value: "yolov8-bacardi",
      url: "https://api.roboflow.com/diego/roboflow-nestle/1/predict",
      label: "Yolo v8 Bacardi",
    },
  ];
  const handleUpload = async () => {
    const image = await loadImageBase64(selectedFile);
    if (selectedFile) {
      const url = modelsURL.find((m) => m.value === model)?.url;
      if (url) {
        const response = await fileService.testImage(image, url);
        setResponse(response);
        console.log(response);
      }
    }
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo antes de enviar.");
      return;
    }
  };
  return (
    <>
      <NavBar />
      <h1 className="uppercase text-center font-bold">Pagina para Testear</h1>
      <br />
      <div className="text-center">
        <DropDown models={modelsURL} model={model} setModel={setModel} />
        <br />
        <FileInput
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          handleUpload={handleUpload}
        />
        <br />
        <ShowJSON response={response} />
      </div>
    </>
  );
}
