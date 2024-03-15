import { Route, Routes } from "react-router-dom";
import ViewVideo from "./pages/ViewVideo";
import Inference from "./pages/Inference";
import { useRef, useState } from "react";


export default function App() {
  const [url, setUrl] = useState<string>("");
  const [recorder, setRecorder] = useState(null);
  const ytRef = useRef(null);
  console.log("appp",url)
  
  return (
    <Routes>
      <Route path="/video" element={<ViewVideo recorder={recorder} setRecorder={setRecorder}  ytref={ytRef} />} />
      <Route
        path="/"
        element={<Inference recorder={recorder} setRecorder={setRecorder} ytRef={ytRef} url={url} setUrl={setUrl} />}
      />
    </Routes>
  );
}
