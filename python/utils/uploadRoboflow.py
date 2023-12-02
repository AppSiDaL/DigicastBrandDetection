import requests
import base64
import io
from PIL import Image
import os
for filename in os.listdir("C:/Users//GILIE//Downloads//ImageAssistant_Batch_Image_Downloader//allNestle"):
    if filename.endswith(".jpg") or filename.endswith(".png"):
      print(filename)

      # Load Image with PIL
      image = Image.open(filename).convert("RGB")

      # Convert to JPEG Buffer
      buffered = io.BytesIO()
      image.save(buffered, quality=90, format="JPEG")

      # Base 64 Encode
      img_str = base64.b64encode(buffered.getvalue())
      img_str = img_str.decode("ascii")



      # Construct the URL
      upload_url = "".join([
          "https://api.roboflow.com/dataset/logo-rum5t/upload",
          "?api_key=" + "nF14XSoXj4sl5RKhIdMS",
          "&name=" +str(filename),
          "&split=train"
      ])

      # POST to the API
      r = requests.post(upload_url, data=img_str, headers={
          "Content-Type": "application/x-www-form-urlencoded"
      })

      # Output result
      print(r.json())