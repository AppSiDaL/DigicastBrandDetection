import React, { useEffect, useState } from 'react';

export default function Speech() {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log('Voice is activated, you can speak to microphone.');
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(prevTranscript => prevTranscript + ' ' + transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      setTranscript(interimTranscript);
    };

    recognition.start();
  }, []);

  return (
    <div>
      <p>Transcript:</p>
      <p>{transcript}</p>
    </div>
  );
}