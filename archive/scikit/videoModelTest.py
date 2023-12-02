import cv2
import os
import numpy as np
from skimage import io
from skimage.feature import hog
from sklearn.svm import LinearSVC
from skimage import io, transform, color
import joblib
clf = LinearSVC()
clf = joblib.load("/home/appsidal/Desktop/bacachoDetection/Prediction/linear_svc_model.pkl")


# Preprocesamiento de la imagen
def preprocess_image(image):
    # Convertir a escala de grises si tiene 4 canales (RGBA)
    if image.shape[2] == 4:
        image = color.rgba2rgb(image)
    # Convertir a escala de grises
    image_gray = color.rgb2gray(image)
    # Redimensionar la imagen a un tamaño fijo
    image_resized = transform.resize(image_gray, (64, 64))
    # Extraer características utilizando el descriptor HOG
    features = hog(image_resized, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2))
    return features


def split_video_into_frames(video_path, output_directory):
    # Verificar si el directorio de salida existe, si no, crearlo
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Abre el video utilizando OpenCV
    video_capture = cv2.VideoCapture(video_path)

    frame_count = 0
    while True:
        # Lee un frame del video
        ret, frame = video_capture.read()

        # Si no hay más frames, sal del bucle
        if not ret:
            break

        # Genera el nombre de archivo para el frame actual
        frame_filename = os.path.join(output_directory, f"frame_{frame_count:04d}.jpg")
        # Guarda el frame como imagen JPEG
        cv2.imwrite(frame_filename, frame)
        ruta=(output_directory+"/"+f"frame_{frame_count:04d}.jpg")
        videoDetection(ruta)

        frame_count += 1

    # Libera los recursos utilizados por OpenCV
    video_capture.release()

def videoDetection(ruta):
        # Ruta de la imagen en la que deseas detectar el logo
    image_path = ruta

    # Cargar la imagen
    image = io.imread(image_path)

    # Preprocesamiento de la imagen
    features = preprocess_image(image)

    # Asegurar que las características sean un arreglo bidimensional
    features = np.expand_dims(features, axis=0)

    # Realizar la predicción
    prediction = clf.predict(features)

    # Verificar el resultado de la predicción
    if prediction[0] == 1:
        print("El logo de Bacardi está presente en la imagen."+ruta)
    else:
        print("El logo de Bacardi no está presente en la imagen."+ruta)



if __name__ == "__main__":
    
    input_video_path = "/home/appsidal/Desktop/bacachoDetection/test/test2.mp4"

    # Directorio donde se guardarán los frames
    output_directory = "/home/appsidal/Desktop/bacachoDetection/test/test2"

    split_video_into_frames(input_video_path, output_directory)
