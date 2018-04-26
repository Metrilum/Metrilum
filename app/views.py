from django.http import JsonResponse
from django.shortcuts import render


# collect event
def collect(request):
    return JsonResponse({"dfsdf": "sdfsdf"})


def serve_script(request):
    return render(request, 'app/collector.js')


def test_page(request):
    return render(request, 'app/test.html')
