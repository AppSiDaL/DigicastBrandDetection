from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import psycopg2
from ultralytics import YOLO
from django.http import StreamingHttpResponse
import requests
import time

def send_discord_notification(webhook_url, content):
    data = {
        "content": content
    }
    response = requests.post(webhook_url, data=data)
    return response

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

def insertar_datos(timestamp, classes, source):
    conexion = conectar_bd()
    cursor = conexion.cursor()
    insert_query = "INSERT INTO detections VALUES (%s, %s, %s)"
    cursor.execute(
        insert_query,
        (timestamp, classes, source),
    )
    conexion.commit()
    cursor.close()
    conexion.close()


@csrf_exempt
def test(request):
    if request.method == "POST":
        body = json.loads(request.body.decode("utf-8"))
        print(body)
        response = JsonResponse({"response": "response"})
        conexion = conectar_bd()
        cursor = conexion.cursor()
        insert_query = (
            "INSERT INTO tesjo_data VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        )
        cursor.execute(
            insert_query,
            (),
        )
        conexion.commit()
        cursor.close()
        conexion.close()
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    return HttpResponse("response")


def api(request):
    return HttpResponse(
        "Esta es la API para DIGICAST Brand Detection" "<br> Developed by AppSiDaL"
    )




@csrf_exempt
def insert(request):
    try:
        data = json.loads(request.body)
        model_path = data.get('modelo')
        source = data.get('source')
        confidence = data.get('confidence')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    model = YOLO(model_path)

    def event_stream():
        results = model(source, stream=True, show=False, conf_thres=confidence)
        for r in results:
            class_names = [model.names[int(i)] for i in r.boxes.cls]
            if len(class_names) > 0:
                print("detection")
                print(class_names)
                send_discord_notification("https://discord.com/api/webhooks/1204850580007157801/L_jwa2YsN8PSyKdLKWRgyWuqfkZHeJW3yAiYgEQYqXREPlyFPolNyKZo0D0_9J6TS6p0", "Detection has been made: " + ', '.join(class_names))
                insertar_datos(int(time.time() * 1000), ', '.join(class_names), source)
                yield 'data: %s\n\n' % ', '.join(class_names)
            else:
                print("no detection")
                yield 'data: %s\n\n' % "no detection"

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')
