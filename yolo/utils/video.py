from __future__ import unicode_literals
from pytube import YouTube
import os
from moviepy.editor import *
import youtube_dl
import os
from os import path
from pydub import AudioSegment
import shutil


def extract_audio(url, type):
    if type == "video":
        video = VideoFileClip(url)
        audio = video.audio
        audio.write_audiofile("audio.mp3")
        audio.close()
        video.close()
        return audio, None
    elif type == "youtube":
        ydl_opts = {
            "format": "bestaudio/best",
            "outtmpl": "audio/%(title)s.%(ext)s",
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }
            ],
        }
        shutil.rmtree("./audio", ignore_errors=True)
        os.makedirs("./audio")
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        audio_files = os.listdir("./audio")
        audio_files = [
            f for f in audio_files if os.path.isfile(os.path.join("./audio", f))
        ]
        if audio_files:
            latest_file = max(
                audio_files, key=lambda x: os.path.getmtime(os.path.join("./audio", x))
            )
            src = "./audio/" + latest_file
        else:
            src = None

        if src is None:
            print("No audio file found")
        else:
            dst = "./audio/test.wav"

            sound = AudioSegment.from_mp3(src)
            sound.export(dst, format="wav")
            AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), "../audio/test.wav")

        # Get video title
        yt = YouTube(url)
        title = yt.title

        return AUDIO_FILE, title
