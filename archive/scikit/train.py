import os
import numpy as np
from skimage import io, transform, color
from skimage.feature import hog
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score
import joblib
import random

dataset_dir = "/home/appsidal/Desktop/bacachoDetection/dataset"
logo_dir = os.path.join(dataset_dir, "with_logo")
no_logo_dir = os.path.join(dataset_dir, "without_logo")

logo_files = os.listdir(logo_dir)
no_logo_files = os.listdir(no_logo_dir)

random.seed(42)
selected_logo_files = random.sample(logo_files, 550)
selected_no_logo_files = random.sample(no_logo_files, 550)

image_paths = [
    os.path.join(logo_dir, image_file) for image_file in selected_logo_files
] + [os.path.join(no_logo_dir, image_file) for image_file in selected_no_logo_files]

labels = [1] * 550 + [0] * 550


def preprocess_image(image):
    # Convertir a escala de grises si tiene 4 canales (RGBA)
    if image.ndim == 3 and image.shape[2] == 4:
        image = color.rgba2rgb(image)
    # Convertir a escala de grises si tiene 3 canales (RGB)
    if image.ndim == 3 and image.shape[2] == 3:
        image = color.rgb2gray(image)
    # Redimensionar la imagen a un tamaño fijo
    image_resized = transform.resize(image, (64, 64))
    # Extraer características utilizando el descriptor HOG
    features = hog(
        image_resized, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2)
    )
    return features


X = []
for image_path in image_paths:
    image = io.imread(image_path)
    features = preprocess_image(image)
    X.append(features)
X = np.array(X)

X_train, X_test, y_train, y_test = train_test_split(
    X, labels, test_size=0.2, random_state=42
)

clf = LinearSVC()
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Precisión del clasificador: {:.2f}%".format(accuracy * 100))

joblib.dump(clf, "./linear_svc_model.pkl")
