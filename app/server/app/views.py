from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import psycopg2
from ultralytics import YOLO
from django.http import StreamingHttpResponse


def conectar_bd():
    # Establecemos la conexión con la base de datos PostgreSQL
    cnx = psycopg2.connect(
        host="dpg-ck5nn58s0i2c73bnhaig-a.oregon-postgres.render.com",
        port="5432",
        database="clima_nq1j",
        user="root",
        password="0jrx4NZj6dWUa8DsHYybJh6uqgHeZC7U",
    )
    return cnx


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
    # Load a pretrained YOLOv8n model
    model = YOLO("../models/bimbo_best.pt")

    # Define source as YouTube video URL
    source = "https://www.youtube.com/watch?v=I01XsBq7S1E"

    def event_stream():
        results = model(source, stream=True)  # generator of Results objects
        for r in results:
            # Access the detections directly
            detections = r.boxes  # boxes is a list of detections
            for det in detections.xyxy:
                # Convert the detection to a dictionary and yield it
                yield 'data: %s\n\n' % json.dumps(det.tolist())

    return StreamingHttpResponse(event_stream(), content_type='text/event-stream')