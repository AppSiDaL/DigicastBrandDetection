import json
import time
import uuid
from django.http import JsonResponse, StreamingHttpResponse
from ultralytics import YOLO
from utils.index import create_detection_message, insertar_datos, send_notifications
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
