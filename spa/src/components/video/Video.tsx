import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "./Loader";
import { detect, detectVideo } from "../../utils/detect";
import "./app.css";
import { PiMountainsDuotone } from "react-icons/pi";
import YTPlayer from "./YTPlayer";

interface VideoProps {
  imageRef: React.RefObject<HTMLImageElement>;
  cameraRef: React.RefObject<HTMLVideoElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  url: string;
  ytRef: React.RefObject<ReactPlayer>;
  streaming: string | null;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function Video({
  imageRef,
  cameraRef,
  videoRef,
  url,
  ytRef,
  canvasRef,
  streaming,
}: VideoProps) {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // references
  // model configs
  const modelName = "yolov8n";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.href}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape ?? [1, 0, 0, 3]);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8 as any,
        inputShape: yolov8.inputs[0].shape as any,
      }); // set model & input shape

      tf.dispose([warmupResults, dummyInput]); // cleanup memory
    });
  }, []);
  return (
    <div className="App">
      {loading.loading && (
        <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>
      )}
      <div className="header">
        <p>
          Inferencia : <code className="code">{modelName}</code>
        </p>
      </div>
      {streaming === null && <PiMountainsDuotone size={300} color="gray" />}
      <div className="content">
        <>
          <img
            src="#"
            ref={imageRef}
            onLoad={() => {
              if (imageRef.current) {
                detect(imageRef.current, model, canvasRef.current);
              }
            }}
          />
          <video
            autoPlay
            className="video"
            muted
            ref={cameraRef}
            onPlay={() => {
              if (cameraRef.current) {
                detectVideo(cameraRef.current, model, canvasRef.current);
              }
            }}
          />
          <video
            autoPlay
            className="video"
            muted
            ref={videoRef}
            onPlay={() => {
              if (videoRef.current) {
                detectVideo(videoRef.current, model, canvasRef.current);
              }
            }}
          />
          <video className="video" ref={ytRef} controls />
          <canvas
            width={model.inputShape[1]}
            height={model.inputShape[2]}
            ref={canvasRef}
          />
        </>
      </div>
    </div>
  );
}
