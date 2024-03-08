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
import testService from "@/app/services/test";
import insertSetvice from "@/app/services/insert";
import { ExtFile } from "@files-ui/react";
import CustomInput from "./CustomInput";
import ResultsCard from "./ResultsCard/Index";
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
      apKey: "nF14XSoXj4sl5RKhIdMS",
      label: "Roboflow 3.0 Nestle",
    },
    {
      value: "yolov8-nestle",
      url: "https://detect.roboflow.com/nestle-tp8gk/3",
      apKey: "nF14XSoXj4sl5RKhIdMS",

      label: "Yolo v8 Nestle",
    },
    {
      value: "roboflow-bimbo",
      url: "https://detect.roboflow.com/bimbo-sv8lq/6",
      apKey: "nF14XSoXj4sl5RKhIdMS",
      label: "Roboflow 3.0 Bimbo",
    },
    {
      value: "yolov8-bimbo",
      url: "https://detect.roboflow.com/bimbo-sv8lq/3",
      apKey: "nF14XSoXj4sl5RKhIdMS",

      label: "Yolo v8 Bimbo",
    },
    {
      value: "yolov8-bacardi",
      url: "https://detect.roboflow.com/bacardi/1",
      apKey: "RAafgaIXhgGTokGEZEA4",
      label: "Yolo v8 Bacardi",
    },
    {
      value: "roboflow-barcel",
      url: "https://detect.roboflow.com/barcel/1",
      apKey: "RAafgaIXhgGTokGEZEA4",
      label: "Roboflow 3.0 Barcel",
    },
    {
      value: "roboflow-marinela",
      url: "https://detect.roboflow.com/marinela/1",
      apKey: "icHf1VHrV3bTO9gSMkVF",
      label: "Roboflow 3.0 Marinela",
    },
    {
      value: "roboflow-mccormick",
      url: "https://detect.roboflow.com/mccormick/1",
      apKey: "icHf1VHrV3bTO9gSMkVF",
      label: "Roboflow 3.0 McCormick",
    },
    {
      value: "roboflow-chedraui",
      url: "https://detect.roboflow.com/chedraui/1",
      apKey: "OfpSUGPl96SKAvyyYziK",
      label: "Roboflow 3.0 Chedraui",
    },
    {
      value: "roboflow-vix",
      url: "https://detect.roboflow.com/vix/1",
      apKey: "OfpSUGPl96SKAvyyYziK",
      label: "Roboflow 3.0 Vix",
    },
    {
      value: "roboflow-walmart",
      url: "https://detect.roboflow.com/walmart-wdyuy/1",
      apKey: "sqPXbIPN9YQmrqIpfRLx",
      label: "Roboflow 3.0 Walmart",
    },
    {
      value: "roboflow-nescafe",
      url: "https://detect.roboflow.com/nescafe-kqoel/1",
      apKey: "sqPXbIPN9YQmrqIpfRLx",
      label: "Roboflow 3.0 Nescafe",
    },
    {
      value: "roboflow-sabritas",
      url: "https://detect.roboflow.com/sabritas/1",
      apKey: "V57pCtLLLqroWGsBGXqb",
      label: "Roboflow 3.0 Sabritas",
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
        const insertGenerator = testService.test(payload);
        const processNextChunk = () => {
          insertGenerator.next().then(({ value, done }) => {
            if (!done) {
              setResponse(value);
              console.log(value);
              processNextChunk();
            }
          });
        };

        processNextChunk();
      } else {
        const image = await loadImageBase64(extFiles[0].file);
        if (extFiles[0]) {
          const url = modelsURLInference.find((m) => m.value === model);
          if (url) {
            setLoading(true); // Set loading to true before the request
            const response = await fileService.testImage(
              image,
              url.url,
              confidence,
              "ads"
            );
            setLoading(false);
            setResponse(response);
            if (response) {
              const responseData = await insertSetvice.insert(response);
              console.log(responseData);
            }
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
      console.log("ads");

      const url = modelsURLRoboflow.find((m) => m.value === model);
      console.log(url);
      if (url) {
        setLoading(true); // Set loading to true before the request
        const data = await fileService.testImage(
          image,
          url?.url,
          confidence,
          url.apKey
        );
        setLoading(false); // Set loading to false after the request is done
        setResponse(data);
        if (response) {
          const responseData = await insertSetvice.insert(response);
          console.log(responseData);
        }
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
      <div className="sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-700 mr-4 ml-4 mt-4 ">
        <div className="flex flex-row">
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
              <SourceTabs
                source={source}
                setSource={setSource}
                response={response}
                setResponse={setResponse}
              />
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
          {isButtonPressed && (
            <div className="flex flex-row" style={{justifyContent:"space-between"}}>
              <InferenceCard
                response={response}
                imageURL={
                  source === "image"
                    ? extFiles[0]?.file && URL.createObjectURL(extFiles[0].file)
                    : url
                }
                source={source}
              />
              <ResultsCard response={response} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
