from ultralytics import YOLO
import uuid
from utils.index import create_detection_message, insertar_datos, send_notifications
import time
import datetime


def logoReco(confidence, modelIndex, modelPath, source, models):
    model = YOLO(modelPath)
    timestamp = time.time()

    timestamp = timestamp if timestamp < 1e10 else timestamp / 1e3

    dt_object = datetime.datetime.fromtimestamp(timestamp)

    inicio = dt_object.strftime("%Y-%m-%d %H:%M:%S")
    results = model(source, stream=True, conf=(confidence / 100))


    class_names = []
    
    for r in results:
        class_names_first = class_names
        all_detections = []
        class_names = [model.names[int(i)] for i in r.boxes.cls]
        boundingBoxes = [str(i.tolist()) for i in r.boxes.xyxy]
        confidences = [str(i.item()) for i in r.boxes.conf]
        if len(class_names) > 0:
            response = {
                "timestamp": timestamp,
                "results": {
                    "bounding_boxes": boundingBoxes,
                    "class_names": class_names,
                    "confidences": confidences,
                },
            }
            all_detections.append(response)
            yield response
        if class_names_first != class_names:
            unique_id = uuid.uuid4()
            insertar_datos(
                class_names,
                "logo",
                confidences,
                boundingBoxes,
                timestamp,
                unique_id,
                source,
                models[modelIndex],
                source,
            )
            final = dt_object.strftime("%Y-%m-%d %H:%M:%S")
            duracion = inicio - final
            message = create_detection_message(
                class_names,
                "logo",
                confidences,
                boundingBoxes,
                timestamp,
                inicio,
                final,
                duracion,
                unique_id,
                source,
                models[modelIndex],
                source,
            )
            send_notifications(message)
