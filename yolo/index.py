import threading
from func.cv import logoReco
from func.spech import spechRecognition
import queue
import json
from utils.index import insertar_datos, send_notifications, create_detection_message
import time
import uuid

models = [
    {
        "label": "yolo-v8-bimbo",
        "path": "../models/bimbo_best.pt",
        "detect": "logo",
        "type": "yolov8",
        "keywords": ["bimbo", "haz sandwich", "pan bimbo"],
    }  
]
print("Available models:")
for i, m in enumerate(models):
    print(f"{i+1}. {m['label']}")

modelIndex = int(input("Enter the number of the model: ")) - 1
modelPath = models[modelIndex]["path"]
keywords = models[modelIndex]["keywords"]
source = str(input("Enter the source: "))
confidence = int(input("Enter the confidence: "))

q1 = queue.Queue()
q2 = queue.Queue()

def wrapper_func(q, func, *args, **kwargs):
    for result in func(*args, **kwargs):
        q.put(result)

thread1 = threading.Thread(target=wrapper_func, args=(q1, spechRecognition, source,models))
thread2 = threading.Thread(
    target=wrapper_func,
    args=(q2, logoReco, confidence, modelIndex, modelPath, source, keywords),
)

thread1.start()
thread2.start()

while True:
    try:
        result = q2.get(timeout=1)  # espera un segundo para un nuevo resultado
        print(result)
    except queue.Empty:
        if not thread2.is_alive():
            break  # si no hay nuevos resultados y el hilo ha terminado, sal del bucle

thread1.join()
thread2.join()

spechRecoResults = q1.get()  # Ahora q1 está asociada con spechRecognition

try:
    with open("results.json", "r") as f:
        data = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    data = []

myuuid = uuid.uuid4()

data.append(
    {
        "info": {
            "model": models[modelIndex]["label"],
            "detect": models[modelIndex]["detect"],
            "type": models[modelIndex]["type"],
            "source": source,
            "confidence": confidence,
        },
        "spechRecognition": spechRecoResults,
        "logoReco": result,
    }
)

with open("results.json", "w") as f:
    json.dump(data, f)
