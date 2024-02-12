import React, { useState } from "react";
import Title from "./Title";
import InferenceTabs from "./InferenceTabs";
import ModelSelect from "./ModelSelect";
import ConfidenceInput from "./ConfidenceInput";
import FileUpload from "./FileUpload";
import SourceTabs from "./SourceTabs";
import "./MainCard.css";
import InferenceCard from "./InferenceCard";
import fileService from "@/app/services/file";
import insertService from "@/app/services/insert";
import { ExtFile } from "@files-ui/react";
import CustomInput from "./CustomInput";

interface MainCardProps {
  server: string;
  setServer: React.Dispatch<React.SetStateAction<string>>;
}
export default function MainCard({ server, setServer }: MainCardProps) {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [model, setModel] = useState("yolo-v8-bimbo");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(40);
  const [extFiles, setExtFiles] = React.useState<ExtFile[]>([]);
  const [source, setSource] = useState<string>("image");
  const [url, setUrl] = useState<string>("");

  const modelsURLRoboflow = [
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
      url: "https://detect.roboflow.com/bimbo-sv8lq/6",
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
  const modelsURLInference = [
    {
      value: "yolov8-bimbo",
      url: "http://localhost:8000/api/insert",
      label: "Yolo v8 Bimbo",
    },
  ];
  const loadImageBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleUpload = async () => {
    if (server === "inference") {
      if (source === "youtube") {
        const payload = {
          modelo: model,
          source: url,
          confidence: confidence,
        };
        await insertService.insert(payload);
      } else {
        const image = await loadImageBase64(extFiles[0].file);
        if (extFiles[0]) {
          const url = modelsURLInference.find((m) => m.value === model)?.url;
          if (url) {
            setLoading(true); // Set loading to true before the request
            const response = await fileService.testImage(
              image,
              url,
              confidence
            );
            setLoading(false); // Set loading to false after the request is done
            setResponse(response);
            console.log(response);
          }
        }
        if (!extFiles[0]) {
          alert("Por favor, selecciona un archivo antes de enviar.");
          return;
        }
      }
    } else {
      const image = await loadImageBase64(extFiles[0].file);

      const url = modelsURLRoboflow.find((m) => m.value === model)?.url;
      if (url) {
        setLoading(true); // Set loading to true before the request
        const response = await fileService.testImage(image, url, confidence);
        setLoading(false); // Set loading to false after the request is done
        setResponse(response);
        console.log(response);
      }
      if (!extFiles[0]) {
        alert("Por favor, selecciona un archivo antes de enviar.");
        return;
      }
    }
  };
  return (
    <div>
      <div className="sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-700 mr-4 ml-4 mt-4 flex flex-row">
        <div className={`main-card ${isButtonPressed ? "animate" : ""}`}>
          <Title />
          <InferenceTabs server={server} setServer={setServer} />
          <form className="mt-8 space-y-6">
            <ModelSelect
              model={model}
              setModel={setModel}
              modelsURL={
                server === "roboflow" ? modelsURLRoboflow : modelsURLInference
              }
            />
            <ConfidenceInput
              confidece={confidence}
              setConfidence={setConfidence}
            />
            <SourceTabs source={source} setSource={setSource} />
            {source === "youtube" ? (
              <CustomInput url={url} setUrl={setUrl} />
            ) : (
              <FileUpload
                extFiles={extFiles}
                setExtFiles={setExtFiles}
                handleUpload={handleUpload}
              />
            )}

            <button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleUpload();
                setIsButtonPressed(true);
              }}
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Run Inference
            </button>
          </form>
        </div>
        {isButtonPressed && extFiles[0] && response && (
          <InferenceCard
            response={response}
            imageURL={
              extFiles[0]?.file && URL.createObjectURL(extFiles[0].file)
            }
          />
        )}
      </div>
    </div>
  );
}
