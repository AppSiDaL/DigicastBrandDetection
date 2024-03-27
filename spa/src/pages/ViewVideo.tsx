import YTPlayer from '@/components/video/YTPlayer'
import React from 'react'

interface ViewVideoProps {
  ytref: React.RefObject<HTMLVideoElement>
  recorder: any
  setRecorder: React.Dispatch<React.SetStateAction<any>>
}

export default function ViewVideo ({ ytref, recorder, setRecorder }: ViewVideoProps): JSX.Element {
  return (
    <div>
      <YTPlayer ytRef={ytref} recorder={recorder} setRecorder={setRecorder}/>
    </div>
  )
}
