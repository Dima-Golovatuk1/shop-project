from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



    
@api_view(["GET"])
def register_user(request):
    try:
        return Response({
            "message": "Register"
        }, status=200)
        
    
    except Exception as e:
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)


@api_view(["POST"])
def register_user(request):
    try:
        name = request.data.get("name")
        last_name = request.data.get("lastName")
        email = request.data.get("email")
        password = request.data.get("password")
        password2 = request.data.get("password2")

        print("Отримані дані:")
        print("Ім'я:", name)
        print("Прізвище:", last_name)
        print("Пошта:", email)
        print("Пароль:", password)

        return Response({
            "message": "Користувача створено",
            "user": request.data
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)


@api_view(["GET"])
def login_user(request):
    try:
        return Response({
            'message': 'Login'
        }, status=200)
        
        
    except Exception as e:
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    
    
@api_view(["POST"])
def login_user(request):
    try:
        name = request.data.get("name")
        last_name = request.data.get("lastName")
        email = request.data.get("email")
        password = request.data.get("password")
        password2 = request.data.get("password2")
    

        return Response({
            'user': request.data,
            'message': 'User logged in successfully'
            }, status=200)
        
    except Exception as e:
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)