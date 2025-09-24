from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User 
from django.contrib.auth import logout, login

from .serializers import LoginSerializer, RegisterSerializer, ProfileSerializer

from logging import getLogger


logger = getLogger(__name__)


@api_view(['GET'])
def profile(request):
    if request.user.is_authenticated:
        
        serializer = ProfileSerializer(instance=request.user)
        
        user = serializer.data
        
        return Response({
            'user': user
        }, status=200)
        
    else:
        return Response({
            'user': 'User is not authentificated'
        }, status=401)


@api_view(["GET"])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({
            "authenticated": True,
            "username": request.user.username
        })
    return Response({"authenticated": False})


    
@api_view(["GET", "POST"])
def register_user(request):
    if request.method == 'POST':
            try:
                serializer = RegisterSerializer(data=request.data)
                if serializer.is_valid():
                    user = serializer.save()
        
                
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

            login(request, user) 
            logger.info(f"user: {user}")

            return Response({
                "message": "User logged in successfully",
                "authenticated": True,
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


@api_view(['GET'])
def logout_user(request):
    try:
        
        if not request.user.is_authenticated:
            return Response({
                "message": "No user is logged in"
                             }, status=404)

            
        user_id = request.user.id
        
        logout(request=request)
            
        return Response({
            'message': 'logout successfully',
            'user_id': user_id
            }, status=200)


    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({'message': 'Error', 'error': str(e)}, status=500)
        

    
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            'message': 'Error',
            'error': str(e),
        })