import * as tf from '@tensorflow/tfjs'
import { renderBoxes } from './renderBox'
import labels from './labels.json'

/**
 * Preprocess image / frame before forwarded into the model
 * @param {HTMLVideoElement|HTMLImageElement} source
 * @param {Number} modelWidth
 * @param {Number} modelHeight
 * @returns input tensor, xRatio and yRatio
 */
const preprocess = (source: any, modelWidth: any, modelHeight: any): any[] => {
  let xRatio, yRatio // ratios for boxes

  const input = tf.tidy(() => {
    const img = tf.browser.fromPixels(
      source as HTMLImageElement | HTMLVideoElement
    )

    // padding image to square => [n, m] to [n, n], n > m
    const [h, w] = img.shape.slice(0, 2) // get source width and height
    const maxSize = Math.max(w, h) // get max size
    const imgPadded = img.pad([
      [0, maxSize - h], // padding y [bottom only]
      [0, maxSize - w], // padding x [right only]
      [0, 0]
    ])

    xRatio = maxSize / w // update xRatio
    yRatio = maxSize / h // update yRatio

    return tf.image
      .resizeBilinear(imgPadded as any, [
        modelWidth as number,
        modelHeight as number
      ]) // resize frame
      .div(255.0) // normalize
      .expandDims(0) // add batch
  })

  return [input, xRatio, yRatio]
}

/**
 * Function run inference and do detection from source.
 * @param {HTMLImageElement|HTMLVideoElement} source
 * @param {tf.GraphModel} model loaded YOLOv8 tensorflow.js model
 * @param {HTMLCanvasElement} canvasRef canvas reference
 * @param {VoidFunction} callback function to run after detection process
 */
export const detect = async (
  source: HTMLImageElement | HTMLVideoElement,
  model: any,
  canvasRef: any,
  resultsRef: any,
  confidence: number,
  object: string,
  modelName: string,
  callback = () => {}
): Promise<any> => {
  const [modelWidth, modelHeight] = model.inputShape.slice(1, 3) // get model width and height

  tf.engine().startScope() // start scoping tf engine
  const [input, xRatio, yRatio] = preprocess(source, modelWidth, modelHeight) // preprocess image
  const res = model.net.execute(input) // inference model
  const transRes = res.transpose([0, 2, 1]) // transpose result [b, det, n] => [b, n, det]
  const boxes = tf.tidy(() => {
    const w: tf.Tensor<tf.Rank.R3> = transRes.slice([0, 0, 2], [-1, -1, 1]) // get width
    const h: tf.Tensor<tf.Rank.R3> = transRes.slice([0, 0, 3], [-1, -1, 1]) // get height
    const x1: tf.Tensor<tf.Rank.R3> = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]) as tf.TensorLike, tf.div(w, 2)) // x1
    const y1: tf.Tensor<tf.Rank.R3> = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]) as tf.TensorLike, tf.div(h, 2)) // y1
    return tf
      .concat(
        [
          y1,
          x1,
          tf.add(y1, h), // y2
          tf.add(x1, w) // x2
        ],
        2
      )
      .squeeze()
  }) // process boxes [y1, x1, y2, x2]
  const modelClasses: [] = (labels as any)[modelName]
  const numClass = modelClasses.length
  const [scores, classes] = tf.tidy(() => {
    // class scores
    const rawScores = transRes.slice([0, 0, 4], [-1, -1, numClass]).squeeze(0) // #6 only squeeze axis 0 to handle only 1 class models
    return [rawScores.max(1), rawScores.argMax(1)]
  }) // get max scores and classes index

  const nms = await tf.image.nonMaxSuppressionAsync(
    boxes as tf.Tensor2D, // Fix: Cast 'boxes' to 'Tensor2D'
    scores as tf.Tensor1D,
    500,
    0.45,
    0.2
  ) // NMS to filter boxes

  const boxesData = boxes.gather(nms, 0).dataSync() // indexing boxes by nms index
  const scoresData = scores.gather(nms, 0).dataSync() // indexing scores by nms index
  const classesData = classes.gather(nms, 0).dataSync() // indexing classes by nms index
  console.log(
    'confidence',
    confidence,
    'scores:',
    scoresData,
    'object:',
    object,
    'classes:',
    classesData
  )

  renderBoxes(
    canvasRef,
    Array.from(boxesData),
    scoresData as any[],
    classesData as any[],
    confidence / 100,
    object,
    modelClasses,
    [xRatio as number, yRatio as number]
  ) // render boxes
  tf.dispose([res, transRes, boxes, scores, classes, nms]) // clear memory

  callback()

  tf.engine().endScope() // end of scoping
  const klasses: Record<number, unknown> = Object.entries(classesData as Record<string, unknown>).reduce<Record<number, unknown>>((acc, [key, value]) => {
    acc[Number(key)] = modelClasses[Number(value)]
    return acc
  }, {})

  const data = {
    boxes: boxesData,
    scores: scoresData,
    classes: klasses
  }
  resultsRef.innerHTML = JSON.stringify(data, null, 2)
}

/**
 * Function to detect video from every source.
 * @param {HTMLVideoElement} vidSource video source
 * @param {tf.GraphModel} model loaded YOLOv8 tensorflow.js model
 * @param {HTMLCanvasElement} canvasRef canvas reference
 */
export const detectVideo = async (
  vidSource: HTMLVideoElement | any,
  model: any,
  canvasRef: any,
  resultsRef: any,
  confidence: number,
  object: string,
  modelName: string
): Promise<any> => {
  /**
   * Function to detect every frame from video
   */
  const detectFrame = (): void => {
    if (vidSource.videoWidth === 0 && vidSource.srcObject === null) {
      const ctx = canvasRef.getContext('2d')
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height) // clean canvas
      return // handle if source is closed
    }
    detect(vidSource as HTMLImageElement | HTMLVideoElement, model, canvasRef, resultsRef, confidence, object, modelName, () => {
      requestAnimationFrame(detectFrame) // get another frame
    }).catch((error) => {
      console.error(error)
    })
  }

  detectFrame()// initialize to detect every frame
}
