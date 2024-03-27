import { cardStyle, colors } from '@/utils'
import { IoMdCamera } from 'react-icons/io'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { IoCloseOutline } from 'react-icons/io5'
import { Webcam } from '../../utils/webCam'

interface WebCamProps {
  streaming: string | null
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>
  cameraRef: React.RefObject<HTMLVideoElement>
}

export default function WebCam ({
  streaming,
  setStreaming,
  cameraRef
}: WebCamProps): JSX.Element {
  const webcam = new Webcam() // webcam handler
  const handleOpen = (): void => {
    if (
      (streaming === null || streaming === 'image') &&
      cameraRef.current !== null
    ) {
      if (
        cameraRef.current !== null &&
        (streaming === null || streaming === 'image')
      ) {
        webcam.open(cameraRef.current).catch((err) => {
          console.log(err)
        }) // open webcam
        cameraRef.current.style.display = 'block' // show camera
        setStreaming('camera') // set streaming to camera
      }
    } else if (streaming === 'camera') {
      if (cameraRef.current !== null) {
        webcam.close(cameraRef.current)

        cameraRef.current.style.display = 'none'
      }
      setStreaming(null)
    } else {
      alert(
        `Can't handle more than 1 stream\nCurrently streaming : ${streaming}`
      )
    } // if streaming video
  }

  return (
    <div
      style={{
        ...cardStyle,
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 7
      }}
    >
      <Button
        variant="ghost"
        style={{ width: '100%', borderColor: 'gray' }}
        onClick={() => { handleOpen() }}

      >
        <IoMdCamera size={40} color="gray" />
        {'   '}
        <Label
          style={{
            color: colors.label,
            textTransform: 'capitalize',
            marginLeft: 5
          }}
        >
          PRUEBA CAMARA WEB
        </Label>
      </Button>
      <IoCloseOutline
        size={25}
        style={{ alignSelf: 'center' }}
        color="red"
        onClick={() => {
          if (cameraRef.current !== null) {
            webcam.close(cameraRef.current)

            cameraRef.current.style.display = 'none'
          }
          setStreaming(null)
        }}
      />
    </div>
  )
}
