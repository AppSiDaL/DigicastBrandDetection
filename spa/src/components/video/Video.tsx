import { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl' // set backend to webgl
import Loader from './Loader'
import { detect, detectVideo } from '../../utils/detect'
import './app.css'
import { PiMountainsDuotone } from 'react-icons/pi'

interface VideoProps {
  resultsRef: React.RefObject<HTMLDivElement>
  imageRef: React.RefObject<HTMLImageElement>
  cameraRef: React.RefObject<HTMLVideoElement>
  videoRef: React.RefObject<HTMLVideoElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  url: string
  ytRef: React.RefObject<HTMLVideoElement>
  streaming: string | null
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>
  confidence: number
  setConfidence: React.Dispatch<React.SetStateAction<number>>
  confidenceRef: any
  object: string
  setObject: React.Dispatch<React.SetStateAction<string>>
}
export default function Video ({
  resultsRef,
  imageRef,
  cameraRef,
  videoRef,
  ytRef,
  canvasRef,
  streaming,
  confidenceRef,
  object
}: VideoProps): JSX.Element {
  const [loading, setLoading] = useState({ loading: true, progress: 0 }) // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3]
  }) // init model & input shape

  // references
  // model configs
  const modelName = 'yolov8n'

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.href}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }) // set loading fractions
          }
        }
      ) // load model

      // warming up model
      const dummyInput = tf.ones(yolov8.inputs[0].shape ?? [1, 0, 0, 3])
      const warmupResults = yolov8.execute(dummyInput)

      setLoading({ loading: false, progress: 1 })
      setModel({
        net: yolov8 as any,
        inputShape: yolov8.inputs[0].shape as any
      }) // set model & input shape

      tf.dispose([warmupResults, dummyInput]) // cleanup memory
    }).catch((error) => {
      console.error(error)
    })
  }, [])
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
              if (imageRef.current !== null) {
                detect(
                  imageRef.current,
                  model,
                  canvasRef.current,
                  resultsRef.current,
                  confidenceRef.current as number,
                  object
                ).catch((error) => {
                  console.error(error)
                })
              }
            }}
          />
          <video
            autoPlay
            className="video"
            ref={cameraRef}
            onPlay={() => {
              if (cameraRef.current !== null) {
                detectVideo(
                  cameraRef.current,
                  model,
                  canvasRef.current,
                  resultsRef.current,
                  confidenceRef.current as number,

                  object
                ).catch((error) => {
                  console.error(error)
                })
              }
            }}
          />
          <video
            autoPlay
            className="video"
            ref={videoRef}
            onPlay={() => {
              if (videoRef.current !== null) {
                detectVideo(
                  videoRef.current,
                  model,
                  canvasRef.current,
                  resultsRef.current,
                  confidenceRef.current as number,
                  object
                ).catch((error) => {
                  console.error(error)
                })
              }
            }}
          />
          <video
            className="video"
            autoPlay
            ref={ytRef}
            onPlay={() => {
              if (ytRef.current !== null) {
                detectVideo(
                  ytRef.current,
                  model,
                  canvasRef.current,
                  resultsRef.current,
                  confidenceRef.current as number,
                  object
                ).catch((error) => {
                  console.error(error)
                })
              }
            }}
          />
          <canvas
            width={model.inputShape[1]}
            height={model.inputShape[2]}
            ref={canvasRef}
          />
        </>
      </div>
    </div>
  )
}
