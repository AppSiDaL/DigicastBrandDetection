import React, { useEffect, useState } from "react";

interface SpeechProps {
  spechResponse: any;
  setSpechResponse: React.Dispatch<React.SetStateAction<any>>;
  streaming: string | null;
  url: string;
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Speech({
  streaming,
  url,
  spechResponse,
  setSpechResponse,
}: SpeechProps) {
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
            setFinalTranscript(
              (prevTranscript) => prevTranscript + " " + transcript
            );
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
        setSpechResponse("Loading...");
      }
    };

    fetchSpeech();

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [streaming, url]); // Agregamos spechResponse a las dependencias

  return (
    <div>
      {streaming === "camera" && (
        <>
          <p>Transcript:</p>
          <p>{finalTranscript + " " + interimTranscript}</p>
        </>
      )}
      {streaming === "yt" && (
        <>
          <p>Transcript:</p>
          <p>{spechResponse}</p>
        </>
      )}
    </div>
  );
}
