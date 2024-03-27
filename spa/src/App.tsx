import { Route, Routes } from 'react-router-dom'
import ViewVideo from './pages/ViewVideo'
import Inference from './pages/Inference'
import { useRef, useState } from 'react'
import Look from './pages/Look'

export default function App (): JSX.Element {
  const [url, setUrl] = useState<string>('')
  const [recorder, setRecorder] = useState(null)
  const ytRef = useRef(null)

  return (
    <Routes>
      <Route
        path="/video"
        element={
          <ViewVideo
            recorder={recorder}
            setRecorder={setRecorder}
            ytref={ytRef}
          />
        }
      />
      <Route
        path="/"
        element={
          <Inference
            recorder={recorder}
            setRecorder={setRecorder}
            ytRef={ytRef}
            url={url}
            setUrl={setUrl}
          />
        }
      />
      <Route path="/look" element={<Look />} />
    </Routes>
  )
}
