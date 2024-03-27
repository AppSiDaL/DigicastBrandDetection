/**
 * Class to handle webcam
 */
export class Webcam {
  /**
   * Open webcam and stream it through video tag.
   * @param {HTMLVideoElement} videoRef video tag reference
   */
  open = async (videoRef: HTMLVideoElement): Promise<void> => {
    if (typeof navigator.mediaDevices.getUserMedia === 'function') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment'
          }
        })
        videoRef.srcObject = stream
      } catch (error) {
        console.error('Error opening Webcam:', error)
      }
    } else {
      alert("Can't open Webcam!")
    }
  }

  /**
   * Close opened webcam.
   * @param {HTMLVideoElement} videoRef video tag reference
   */
  close = (videoRef: HTMLVideoElement): void => {
    if (videoRef.srcObject !== null) {
      (videoRef.srcObject as MediaStream)
        .getTracks()
        .forEach((track: MediaStreamTrack) => {
          // Add type assertion for 'videoRef.srcObject'
          track.stop()
        })
      videoRef.srcObject = null
    } else alert('Please open Webcam first!')
  }
}
