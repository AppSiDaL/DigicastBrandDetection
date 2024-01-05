"use client";
import React, { useState } from "react";
import FileInput from "./components/FileInput";
import ShowJSON from "./components/ShowJSON";
import fileService from "../services/file";
import NavBar from "../components/NavBar";
import DropDown from "./components/DropDown";
import { Stage, Layer, Rect, Image, Label, Text, Group } from "react-konva";
import ImageUploaded from "./components/ImageUploaded";
import useImage from "use-image";
export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [model, setModel] = useState("roboflow-nestle" as string);
  const [loading, setLoading] = useState(false);
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
      url: "https://detect.roboflow.com/nestle-tp8gk/2",
      label: "Roboflow 3.0 Nestle",
    },
    {
      value: "yolov8-nestle",
      url: "https://detect.roboflow.com/nestle-tp8gk/3",
      label: "Yolo v8 Nestle",
    },
    {
      value: "roboflow-bimbo",
      url: "https://detect.roboflow.com/bimbo-sv8lq/2",
      label: "Roboflow 3.0 Bimbo",
    },
    {
      value: "yolov8-bimbo",
      url: "https://detect.roboflow.com/bimbo-sv8lq/3",
      label: "Yolo v8 Bimbo",
    },
    {
      value: "yolov8-bacardi",
      url: "https://api.roboflow.com/diego/roboflow-nestle/1/predict",
      label: "Yolo v8 Bacardi",
    },
  ];
  const URLImage = ({ url, width, height }: any) => {
    const [image] = useImage(url);
    return <Image width={width} height={height} image={image} alt="" />;
  };
  function BoundingBoxes({ response, imageURL }: any) {
    return (
      <Stage width={response.image.width} height={response.image.height}>
        <Layer>
          <URLImage
            url={imageURL}
            width={response.image.width}
            height={response.image.height}
          />
          <Rect
            x={0}
            y={0}
            width={response.image.width}
            height={response.image.height}
            stroke="red"
            strokeWidth={2}
          />
          {response.predictions.map((prediction: any, i: any) => {
            const x1 = prediction.x - prediction.width / 2;
            const y1 = prediction.y - prediction.height / 2;
            return (
              <Group key={i}>
                <Rect
                  x={x1}
                  y={y1}
                  width={prediction.width}
                  height={prediction.height}
                  stroke="red"
                  strokeWidth={2}
                />
                <Text
                  fill="blue"
                  text={`${prediction.class}-${prediction.confidence.toFixed(
                    2
                  )}`}
                  fontSize={15}
                  x={x1 + 5} // Ajusta estos valores según necesites
                  y={y1 + 5} // Ajusta estos valores según necesites
                />
              </Group>
            );
          })}
        </Layer>
      </Stage>
    );
  }

  const handleUpload = async () => {
    const image = await loadImageBase64(selectedFile);
    if (selectedFile) {
      const url = modelsURL.find((m) => m.value === model)?.url;
      if (url) {
        setLoading(true); // Set loading to true before the request
        const response = await fileService.testImage(image, url);
        setLoading(false); // Set loading to false after the request is done
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
        {!response && <ImageUploaded selectedFile={selectedFile} />}
        <br />
        {loading && <h1>Cargando ...</h1>}
        <ShowJSON response={response} />
        {response && selectedFile && (
          <BoundingBoxes
            response={response}
            imageURL={URL.createObjectURL(selectedFile)}
          />
        )}
      </div>
    </>
  );
}
