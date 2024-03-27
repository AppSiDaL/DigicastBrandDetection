import { useRef, useState } from 'react'
import './uploader.css'
import { MdCloudUpload } from 'react-icons/md'
import { Card, CardContent } from '../ui/card'
import { cardStyle, colors } from '@/utils'
import { Label } from '../ui/label'
import { IoCloseOutline } from 'react-icons/io5'
import SpechService from '../../services/spech'

interface UploaderProps {
  imageRef: React.RefObject<HTMLImageElement>
  canvasRef: React.RefObject<HTMLCanvasElement>
  videoRef: React.RefObject<HTMLVideoElement>
  cameraRef: React.RefObject<HTMLVideoElement>
  streaming: string | null
  setSpechResponse: any
  spechResponse: any
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Uploader ({
  setSpechResponse,
  imageRef,
  videoRef,
  streaming,
  setStreaming
}: UploaderProps): JSX.Element {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('No selected file')
  const fileInput = useRef(null)

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files.length !== 0) {
      setFileName(files[0].name)
      setFile(files[0])
    }
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const closeImage = (): void => {
    const url = imageRef.current?.src
    if (imageRef.current !== null) {
      imageRef.current.src = '#' // restore image source
    }
    URL.revokeObjectURL(url ?? '') // revoke url

    setStreaming(null) // set streaming to null
    if (fileInput.current !== null) {
      (fileInput.current as HTMLInputElement).value = '' // reset input image
    }
    if (imageRef.current !== null) {
      imageRef.current.style.display = 'none' // hide image
    }
  }

  const closeVideo = (): void => {
    const url = videoRef.current?.src
    if (videoRef.current !== null) {
      videoRef.current.src = '' // restore video source
    }
    URL.revokeObjectURL(url ?? '') // revoke url

    setStreaming(null) // set streaming to null
    if (fileInput.current !== null) {
      (fileInput.current as HTMLInputElement).value = '' // reset input video
    }
    if (videoRef.current !== null) {
      videoRef.current.style.display = 'none' // hide video
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files !== null) {
      const file = e.target.files[0]
      setFile(file)
      setFileName(file.name)
      const url = URL.createObjectURL(file) // create blob url
      if (file.type.startsWith('image')) {
        if (imageRef.current !== null) {
          imageRef.current.src = url // set image source
          imageRef.current.style.display = 'block' // show image
          setStreaming('image' as 'image' | null) // set streaming to image
        }
      } else if (file.type.startsWith('video')) {
        SpechService.getSpechVideo(file)
          .then((data) => {
            setSpechResponse(data.spech)
            console.log(data)
          })
          .catch((error) => {
            console.log(error)
          })
        if (videoRef.current !== null) {
          videoRef.current.src = url // set video source
          videoRef.current.style.display = 'block' // show video
          setStreaming('video' as 'video' | null) // set streaming to video
        }
      }
    }
  }

  return (
    <Card style={{ ...cardStyle }}>
      <CardContent>
        <Label
          htmlFor="name"
          style={{ textTransform: 'capitalize', color: colors.label }}
        >
          SUBIR IMAGEN O ARCHIVO DE VIDEO
        </Label>
        <main onDrop={onDrop} onDragOver={onDragOver}>
          <form
            onClick={() => {
              const inputField = document.querySelector('.input-field')
              if (inputField instanceof HTMLElement) {
                inputField.click()
              }
            }}
          >
            <input
              type="file"
              accept="image/*, video/*"
              ref={fileInput}
              className="input-field"
              hidden
              onChange={handleFileChange}
            />

            {file !== null
              ? (
                  file.type.startsWith('image')
                    ? (
                <img
                  src={URL.createObjectURL(file)}
                  style={{ maxHeight: '80%', objectFit: 'contain' }}
                  alt={fileName}
                />
                      )
                    : (
                <video
                  src={URL.createObjectURL(file)}
                  style={{ maxHeight: '80%', objectFit: 'contain' }}
                  controls
                />
                      )
                )
              : (
              <>
                <MdCloudUpload color="gray" size={60} />
                <p>Suelta Archivos Aqui o Selecciona</p>
              </>
                )}
          </form>
        </main>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ maxWidth: '90%' }}>{fileName}</p>
          <IoCloseOutline
            size={25}
            color="red"
            onClick={() => {
              setFileName('No selected File')
              setFile(null)
              if (streaming === 'image') closeImage()
              else if (streaming === 'video') closeVideo()
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
