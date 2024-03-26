from __future__ import unicode_literals
from django.http import HttpResponse, JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
import json
import psycopg2
from ultralytics import YOLO
from django.http import StreamingHttpResponse
import requests
import time
import smtplib
from email.mime.text import MIMEText
import uuid
from pytube import YouTube
import os
from moviepy.editor import *
import youtube_dl
import os
from os import path
from pydub import AudioSegment
import shutil


def create_detection_message(
    class_name,
    detection_type,
    confidence,
    coordinates,
    timestamp,
    unique_id,
    source,
    model_info,
    media_link,
):
    message = (
        f"Detection Information:\n"
        f"  Type: {detection_type}\n"
        f"  Class: {class_name}\n"
        f"  Confidence: {confidence}\n"
        f"  Coordinates: {coordinates}\n"
        f"  Timestamp: {timestamp}\n"
        f"  ID: {unique_id}\n"
        f"  Source: {source}\n"
        f"  Model: {model_info}\n"
        f"  Media Link: {media_link}"
    )
    return message


def conectar_bd():
    # Establecemos la conexión con la base de datos PostgreSQL
    cnx = psycopg2.connect(
        host="digicast-tesjobranddetection-690b.a.aivencloud.com",
        port="12408",
        database="defaultdb",
        user="avnadmin",
        password="AVNS_buehwtFO-rCTxOaLJOz",
    )
    return cnx


def insertar_datos(
    class_names,
    detection_type,
    confidence,
    coordinates,
    timestamp,
    unique_id,
    source,
    model_info,
    media_link,
):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    insert_query = "INSERT INTO detections VALUES (%s, %s, %s,%s, %s, %s,%s, %s, %s)"
    cursor.execute(
        insert_query,
        (
            str(unique_id),
            detection_type,
            class_names,
            confidence,
            coordinates,
            timestamp,
            source,
            model_info,
            media_link,
        ),
    )
    conexion.commit()
    cursor.close()
    conexion.close()


def send_discord_notification(content):
    webhook_url = "https://discord.com/api/webhooks/1204850580007157801/L_jwa2YsN8PSyKdLKWRgyWuqfkZHeJW3yAiYgEQYqXREPlyFPolNyKZo0D0_9J6TS6p0"
    data = {"content": content}
    response = requests.post(webhook_url, data=data)
    return response


def send_wa_notification(content):
    api_key = "7760227"
    phone_number = "5217228926042"
    url = f"https://api.callmebot.com/whatsapp.php?phone={phone_number}&text={content}&apikey={api_key}"
    response = requests.get(url)
    return response


def send_telegram_notification(content):
    TOKEN = "6634811016:AAHD3eBbiyWpCuW6B2ryEcwh17bs45ftl2I"
    chat_id = "5050956893"
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={chat_id}&text={content}"
    response = requests.get(url).json()
    return response


def send_email_notification(content):
    subject = "Detections"
    sender = "tesjobranddetection@gmail.com"
    recipients = ["gilielcrack343@gmail.com"]
    password = "oltd lrwt onui sqlu"
    msg = MIMEText(content)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = ", ".join(recipients)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp_server:
        smtp_server.login(sender, password)
        smtp_server.sendmail(sender, recipients, msg.as_string())
    print("Message sent!")


def send_messenger_notification(content):
    api_key = "OFW0mdCdSbut1Bfk"
    url = f"https://api.callmebot.com/facebook/send.php?apikey={api_key}&text={content}"
    response = requests.get(url)
    return response


def send_notifications(data):
    send_discord_notification(data)
    send_wa_notification(data)
    send_telegram_notification(data)
    send_email_notification(data)
    send_messenger_notification(data)


@csrf_exempt
def test(request):
    try:
        data = json.loads(request.body)
        print(data)
        models = [
            {
                "label": "yolo-v8-bimbo",
                "path": "../models/bimbo_best.pt",
                "detect": "logo",
                "type": "yolov8",
            }
        ]

        model = data.get("modelo")
        modelUsed = [m["label"] for m in models]
        modelIndex = modelUsed.index(model)
        modelPath = models[modelIndex]["path"]
        source = str(data.get("source"))
        confidence = data.get("confidence")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    model = YOLO(modelPath)

    def event_stream():
        results = model(source, stream=True, conf=(confidence / 100))
        for r in results:
            class_names = [model.names[int(i)] for i in r.boxes.cls]
            confidences = [str(i.item()) for i in r.boxes.conf]
            if len(class_names) > 0:
                myuuid = uuid.uuid4()
                data = create_detection_message(
                    ", ".join(class_names),
                    models[modelIndex]["detect"],
                    ", ".join(confidences),
                    r.boxes.xyxy[0].tolist(),
                    int(time.time() * 1000),
                    myuuid,
                    "youtube",
                    models[modelIndex]["label"],
                    source,
                )

                insertar_datos(
                    ", ".join(class_names),
                    models[modelIndex]["detect"],
                    ", ".join(confidences),
                    r.boxes.xyxy[0].tolist(),
                    int(time.time() * 1000),
                    myuuid,
                    "youtube",
                    models[modelIndex]["label"],
                    source,
                )
                send_notifications(data)
                timestamp = time.time()
                response = {
                    "timestamp": timestamp,
                    "results": {
                        "bounding_boxes": r.boxes.xyxy[0].tolist(),
                        "class_names": class_names,
                    },
                }
                yield f"data: {json.dumps(response)}\n\n"
                print(response)
            else:
                response = {"timestamp": time.time(), "results": "no detection"}
                yield f"data: {json.dumps(response)}\n\n"
                print(response)

    return StreamingHttpResponse(
        event_stream(), content_type="multipart/x-mixed-replace; boundary=frame"
    )


def api(request):
    return HttpResponse(
        "Esta es la API para DIGICAST Brand Detection" "<br> Developed by AppSiDaL"
    )


@csrf_exempt
def insert(request):
    try:
        data = json.loads(request.body)
        print(data)
        class_names = data.get("class_names")
        detection_type = data.get("detection_type")
        confidence = data.get("confidence")
        coordinates = data.get("coordinates")
        timestamp = data.get("timestamp")
        unique_id = data.get("unique_id")
        source = data.get("source")
        model_info = data.get("model_info")
        media_link = data.get("media_link")
        myuuid = uuid.uuid4()
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    insertar_datos(
        class_names,
        detection_type,
        confidence,
        coordinates,
        timestamp,
        myuuid,
        source,
        model_info,
        media_link,
    )
    send_notifications(
        create_detection_message(
            class_names,
            detection_type,
            confidence,
            coordinates,
            timestamp,
            unique_id,
            source,
            model_info,
            media_link,
        )
    )
    return JsonResponse({"message": "Data inserted successfully"})


@csrf_exempt
def extract_audio(url, type):
    print(url, "---------------", type)
    shutil.rmtree("./audio", ignore_errors=True)
    os.makedirs("./audio")
    if type == "video":

        video = VideoFileClip(url)
        audio = video.audio
        audio_file_path = "audio/audio.mp3"
        audio.write_audiofile(audio_file_path)
        audio.close()
        video.close()

        # Convert mp3 file to wav
        sound = AudioSegment.from_mp3(audio_file_path)
        dst = "audio/audio.wav"
        sound.export(dst, format="wav")
        AUDIO_FILE = path.join(
            path.dirname(path.realpath(__file__)), "../audio/audio.wav"
        )

        return AUDIO_FILE, None
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
            AUDIO_FILE = path.join(
                path.dirname(path.realpath(__file__)), "../audio/test.wav"
            )

        # Get video title
        yt = YouTube(url)
        title = yt.title

        return AUDIO_FILE, title


@csrf_exempt
def spech(request):
    data = json.loads(request.body)
    print(data)
    url = data.get("url")
    import speech_recognition as sr

    print("initiating speech recognition")
    r = sr.Recognizer()
    try:
        AUDIO_FILE, title = extract_audio(url, "youtube")
    except requests.exceptions.Timeout:
        print("Timeout occurred while extracting audio")
        return JsonResponse({"error": "Timeout occurred while extracting audio"})
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)
    try:
        spech = r.recognize_google(audio, language="es-MX")
        spech = spech.lower()
        return JsonResponse({"spech": spech})
    except sr.UnknownValueError:
        print("Sphinx could not understand audio")
    except sr.RequestError as e:
        print("Sphinx error; {0}".format(e))


from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
import os


@csrf_exempt
def videoSpech(request):
    if request.method == "POST":
        file = request.FILES["file"]  # get the file
        file_name = default_storage.save(
            file.name, ContentFile(file.read())
        )  # save the file
        file_path = os.path.join(
            settings.MEDIA_ROOT, file_name
        )  # get the path of the file

        import speech_recognition as sr

        print("initiating speech recognition")
        r = sr.Recognizer()
        try:
            AUDIO_FILE, title = extract_audio(file_path, "video")
        except requests.exceptions.Timeout:
            print("Timeout occurred while extracting audio")
            return JsonResponse({"error": "Timeout occurred while extracting audio"})
        try:
            with sr.AudioFile(AUDIO_FILE) as source:
                audio = r.record(source)
            try:
                spech = r.recognize_google(audio, language="es-MX")
                spech = spech.lower()
                return JsonResponse({"spech": spech})
            except sr.UnknownValueError:
                print("Sphinx could not understand audio")
            except sr.RequestError as e:
                print("Sphinx error; {0}".format(e))
        finally:
            os.remove(file_path) 
    else:
        return JsonResponse({"error": "Invalid request method"})
