import { Card, CardContent } from '@/components/ui/card'
import { FaArrowRight } from 'react-icons/fa6'
import { cardStyle, colors } from '@/utils'
import { Label } from '../ui/label'
import { CiLink } from 'react-icons/ci'
import { Input } from '../ui/input'
import { IoCloseOutline } from 'react-icons/io5'
import SpechService from '../../services/spech'

interface UploaderProps {
  setSpechResponse: any
  spechResponse: any
  ytRef: any
  canvasRef: React.RefObject<HTMLCanvasElement>
  streaming: string | null
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  recorder: any
  setRecorder: React.Dispatch<React.SetStateAction<any>>
}

export default function URLInput ({
  setSpechResponse,
  url,
  setUrl,
  ytRef,
  recorder,
  setRecorder,
  streaming,
  setStreaming
}: UploaderProps): JSX.Element {
  const handlePlay = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {},
      audio: false
    })
    if (ytRef.current !== null) {
      ytRef.current.srcObject = stream
    }
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm'
    })
    setRecorder(mediaRecorder)
    mediaRecorder.start()
    mediaRecorder.addEventListener('dataavailable', (evt) => {
      const streamUrl = URL.createObjectURL(evt.data)
      if (ytRef.current !== null) {
        ytRef.current.src = streamUrl
        ytRef.current.onloadeddata = () => {
          URL.revokeObjectURL(streamUrl)
        }
      }
    })
    if (streaming === null || streaming === 'image') {
      ytRef.current.style.display = 'block' // show camera
      setStreaming('yt') // set streaming to camera
    }
  }
  const handleClick = async (): Promise<void> => {
    const URL =
      window.location.protocol +
      '//' +
      window.location.host +
      '/video' +
      '?url=' +
      url
    window.open(URL, '_blank')
    if (streaming === null || streaming === 'image') {
      ytRef.current.style.display = 'block' // show camera
      setStreaming('yt') // set streaming to camera
    }
    await handlePlay()
    SpechService.getSpech(url)
      .then((response) => {
        setSpechResponse(response.spech)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const endStream = (): void => {
    if (ytRef.current !== null) {
      ytRef.current.srcObject = null
      ytRef.current.src = ''
      ytRef.current.style.display = 'none'
      recorder.stream.getTracks().forEach((track: any) => track.stop())
      setUrl('')
    }
    if (streaming === 'yt') {
      setStreaming(null)
    }
  }
  return (
    <Card style={{ ...cardStyle, display: 'flex', justifyContent: 'center' }}>
      <CardContent>
        <div style={{ margin: 5 }}>
          <Label style={{ textTransform: 'uppercase', color: colors.label }}>
            Pegar URL de la imagen o video
          </Label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {url === ''
              ? (
              <CiLink size={40} color="red" />
                )
              : (
              <FaArrowRight
                size={40}
                color="green"
                onClick={() => {
                  console.log(ytRef.current)
                  if (ytRef.current !== null) {
                    handleClick().catch(error => {
                      console.error('Error:', error)
                    })
                  }
                }}
              />
                )}
            <Input
              type="text"
              placeholder="Paste URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value)
              }}
            />
            <IoCloseOutline
              size={25}
              color="red"
              onClick={() => {
                if (streaming === 'yt') endStream()
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
