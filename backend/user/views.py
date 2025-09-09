from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(["POST"])
def register_user(request):

    name = request.data.get("name")
    last_name = request.data.get("lastName")
    email = request.data.get("email")
    password = request.data.get("password")

    print("Отримані дані:")
    print("Ім'я:", name)
    print("Прізвище:", last_name)
    print("Пошта:", email)
    print("Пароль:", password)

    return Response({
        "message": "Користувача створено",
        "user": request.data
    }, status=status.HTTP_201_CREATED)