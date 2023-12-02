import os
import numpy as np
from skimage import io
from skimage.feature import hog
from sklearn.svm import LinearSVC
from skimage import io, transform, color
import joblib

# Cargar el modelo entrenado
clf = LinearSVC()
clf = joblib.load(
    "/home/appsidal/Desktop/bacachoDetection/Prediction/linear_svc_model.pkl"
)


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
    features = hog(
        image_resized, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2)
    )
    return features


# Ruta de la imagen en la que deseas detectar el logo
image_path = "./IMAGEN2.png"

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
    print("El logo de Bacardi está presente en la imagen.")
else:
    print("El logo de Bacardi no está presente en la imagen.")
