from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, HttpResponseServerError

def processing_view(request):
    return HttpResponse("Йде обробка, зачекай", status=102)


def ok_view(request):
    return HttpResponse("Да", status=200)


def login_redirect_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect("user/login/", status=302)
    return HttpResponse("Ласкаво просимо, ти залогінений!")


def search_view(request):
    da = request.GET.get("da")
    if not da:
        return HttpResponseBadRequest("Помилка", status=400)
    return HttpResponse(f"Результати пошуку для: {da}")



def buggy_view(request):
    try:
        print("тут повина бути якась логіка але мені лінь ї писати")
    except ZeroDivisionError:
        return HttpResponseServerError("Помилка", status=500)