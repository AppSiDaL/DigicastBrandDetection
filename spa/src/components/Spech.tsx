import React, { useEffect, useState } from 'react'
import { BsBodyText } from 'react-icons/bs'
interface SpeechProps {
  spechResponse: any
  setSpechResponse: React.Dispatch<React.SetStateAction<any>>
  streaming: string | null
  url: string
  setStreaming: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Speech ({
  streaming,
  url,
  spechResponse,
  setSpechResponse
}: SpeechProps): JSX.Element {
  const [finalTranscript, setFinalTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')

  useEffect(() => {
    let recognition: any | undefined

    if (streaming === 'camera') {
      const SpeechRecognition =
        (window as any).SpeechRecognition !== undefined ||
        (window as any).webkitSpeechRecognition
      recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        console.log('Voice is activated, you can speak to microphone.')
      }

      recognition.onresult = (event: any) => {
        let interim = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal === true) {
            setFinalTranscript(
              (prevTranscript) => prevTranscript + ' ' + transcript
            )
          } else {
            interim += transcript
          }
        }
        setInterimTranscript(interim)
      }

      recognition.start()
    }

    const fetchSpeech = (): void => {
      if (streaming === 'yt') {
        setSpechResponse('Loading...')
      }
      if (streaming === 'video') {
        setSpechResponse('Loading...')
      }
    }

    fetchSpeech()

    return () => {
      if (recognition !== undefined) {
        recognition.stop()
      }
    }
  }, [streaming, url]) // Agregamos spechResponse a las dependencias

  return (
    <div
      style={{
        height: '100%',
        maxHeight: '100%',
        overflow: 'auto',
        alignContent: 'center'
      }}
    >
      {streaming === 'camera' && (
        <>
          <p>Transcript:</p>
          <p>{finalTranscript + ' ' + interimTranscript}</p>
        </>
      )}
      {streaming === 'yt' && (
        <>
          <p>Transcript:</p>
          <p>{spechResponse}</p>
        </>
      )}
      {streaming === 'video' && (
        <>
          <p>Transcript:</p>
          <p>{spechResponse}</p>
        </>
      )}
      {streaming === null && (
        <BsBodyText style={{ margin: 'auto' }} size={320} color="gray" />
      )}
    </div>
  )
}
