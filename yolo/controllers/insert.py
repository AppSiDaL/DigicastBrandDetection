import json
import uuid
from django.http import JsonResponse
from utils.index import create_detection_message, insertar_datos, send_notifications

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
