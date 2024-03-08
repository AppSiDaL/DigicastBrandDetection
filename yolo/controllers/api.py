from django.http import HttpResponse

def api(request):
    return HttpResponse(
        "Esta es la API para DIGICAST Brand Detection" "<br> Developed by AppSiDaL"
    )


