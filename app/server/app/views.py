from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json




@csrf_exempt
def test(request):
    if request.method == "POST":
        body = json.loads(request.body.decode("utf-8"))
        print(body)
        response = JsonResponse({"response": "response"})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    return HttpResponse("response")


def api(request):
    return HttpResponse(
        "Esta es la API para DIGICAST Brand Detection" "<br> Developed by AppSiDaL"
    )


@csrf_exempt
def insert(request):
    if request.method == "POST":
        body = json.loads(request.body.decode("utf-8"))
        print(body)
        response = JsonResponse({"response": "response"})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    return HttpResponse("response")