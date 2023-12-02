import os

def rename_images(folder_path, prefix, start_index=1, num_digits=4):
    file_list = os.listdir(folder_path)
    file_list.sort()  # Ordena la lista de archivos en orden alfabético

    count = start_index
    for file_name in file_list:
        if (
            file_name.endswith(".jpg")
            or file_name.endswith(".png")
            or file_name.endswith(".jpeg")
        ):
            # Utilizamos str.zfill() para agregar ceros a la izquierda
            new_name = f"{prefix}{str(count).zfill(num_digits)}.jpg"
            old_path = os.path.join(folder_path, file_name)
            new_path = os.path.join(folder_path, new_name)
            os.rename(old_path, new_path)
            print(f"Renombrado {file_name} a {new_name}")
            count += 1

# Ejemplo de uso
folder_path = "C:/Users/GILIE/APPSIDAL/GH/DigicastLogoDetection/LogoDetection/bimbo"
prefix = "bimbo"  # Prefijo para los nuevos nombres de archivo

# Llama a la función con el número de dígitos que deseas y el índice de inicio
rename_images(folder_path, prefix, start_index=1, num_digits=6)
