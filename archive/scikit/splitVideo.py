import cv2
import os


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

        frame_count += 1

    # Libera los recursos utilizados por OpenCV
    video_capture.release()


if __name__ == "__main__":
    # Ruta del video que deseas dividir en frames
    input_video_path = "/home/appsidal/Desktop/bacachoDetection/test/1.mp4"

    # Directorio donde se guardarán los frames
    output_directory = "/home/appsidal/Desktop/bacachoDetection/test/test1"

    split_video_into_frames(input_video_path, output_directory)
