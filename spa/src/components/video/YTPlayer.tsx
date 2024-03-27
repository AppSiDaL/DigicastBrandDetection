import { useRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

export default function YTPlayer (): JSX.Element {
  const playerRef = useRef(null)
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    const fullUrl = new URL(window.location.href)
    const videoUrl = fullUrl.searchParams.get('url')
    setUrl(videoUrl ?? '')
  }, [])

  return (
    <div>
      <ReactPlayer
        width="100vw"
        height="100vh"
        url={url}
        playing={true}
        ref={playerRef}
      />
    </div>
  )
}
