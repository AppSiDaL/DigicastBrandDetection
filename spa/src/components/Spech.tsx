import React, { useEffect, useState } from "react";
import SpechService from "../services/spech";

interface SpeechProps {
  streaming: string | null;
  url: string;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
}


export default function Speech({ streaming, url }: SpeechProps) {
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  useEffect(() => {
    let recognition: SpeechRecognition | undefined;

    if (streaming === "camera") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        console.log("Voice is activated, you can speak to microphone.");
      };

      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setFinalTranscript((prevTranscript) => prevTranscript + " " + transcript);
          } else {
            interim += transcript;
          }
        }
        setInterimTranscript(interim);
      };

      recognition.start();
    }

    const fetchSpeech = async () => {
      if (streaming === "yt") {
        const spech = await SpechService.getSpech(url);
        console.log(spech)
      }
    };

    fetchSpeech();

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [streaming, url]);

  return (
    <div>
      {streaming === "camera" && (
        <>
          <p>Transcript:</p>
          <p>{finalTranscript + " " + interimTranscript}</p>
        </>
      )}
    </div>
  );
}