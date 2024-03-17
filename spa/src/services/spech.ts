// Import the Google Cloud client library
const speech = require('@google-cloud/speech');

async function transcribeAudioStream(audioStream) {
  const client = new speech.SpeechClient();

  const request = {
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
    interimResults: true, // If you want interim results, set this to true
  };

  // Stream the audio to the Speech-to-Text API
  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
      process.stdout.write(
        data.results[0] && data.results[0].alternatives[0]
          ? `Transcript: ${data.results[0].alternatives[0].transcript}\n`
          : '\n'
      )
    );

  // Stream the audio from the video to the Speech-to-Text API
  audioStream.pipe(recognizeStream);
}

// TODO: Replace with the stream of your audio file
const audioStream = getAudioStreamFromVideo();
transcribeAudioStream(audioStream);