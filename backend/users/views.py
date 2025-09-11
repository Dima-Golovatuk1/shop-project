from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User

from .serializers import LoginSerializer, RegisterSerializer

from logging import getLogger


logger = getLogger(__name__)

    
@api_view(["GET", "POST"])
def register_user(request):
    if request.method == 'POST':
            try:
                serializer = RegisterSerializer(data=request.data)
                if serializer.is_valid():
                    user = serializer.save()

                logger.info(f"user: {user}")
        
                
                return Response({
                    "message": "User created successfully",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "phone_number": user.phone_number
                    }
                }, status=status.HTTP_201_CREATED)
            
            except Exception as e:
                return Response({
                    "message": "Error",
                    "error": str(e)
                }, status=500)
                
    try:
        return Response({
            "message": "Register"
        }, status=200)
        
    
    except Exception as e:
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)


      
@api_view(['GET', 'POST'])
def login_user(request):
    if request.method == 'POST':
        try:
            
            serializer = LoginSerializer(data=request.data)
            
            if serializer.is_valid():
                user = serializer.validated_data["user"]

            logger.info(f"user: {user}")

            return Response({
                "message": "User logged in successfully",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "phone_number": user.phone_number
                }
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error("Error:\n", str(e))
            return Response({
                "message": "Error",
                "error": str(e)
            }, status=500)
    
    try:        
        return Response({
            'message': 'Login page',
        })
    
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            'message': 'Error',
            'error': str(e),
        })