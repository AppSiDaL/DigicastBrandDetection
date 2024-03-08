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


def create_detection_message(
    class_name,
    detection_type,
    confidence,
    coordinates,
    timestamp,
    inicio,
    final,
    duracion,
    unique_id,
    source,
    model_info,
    media_link,
):
    message = (
        f"Detection Information:\n"
        f"  Tipo: {detection_type}\n"
        f"  Marca: {class_name}\n"
        f"  Inicio: {inicio}\n"
        f"  Final: {final}\n"
        f"  Duración: {duracion}\n"
        f"  Source: {source}\n"
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
    sender = "apsidalmonk6181@gmail.com"
    recipients = ["gilielcrack343@gmail.com"]
    password = "meng wcyc phro fpmh"
    msg = MIMEText(content)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = ", ".join(recipients)
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp_server:
        smtp_server.login(sender, password)
        smtp_server.sendmail(sender, recipients, msg.as_string())


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
