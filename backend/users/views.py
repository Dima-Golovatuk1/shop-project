from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.models import User


from logging import getLogger


logger = getLogger(__name__)

    
@api_view(["GET", "POST"])
def register_user(request):
    if request.method == 'POST':
            try:
                name = request.data.get("name")
                last_name = request.data.get("lastName")
                email = request.data.get("email")
                password = request.data.get("password")
                password2 = request.data.get("password2")


                logger.info(
                    f"""
                    User created:\n
                    name: {name}\n
                    lastname: {last_name}\n
                    email: {email}\n
                    password: {password}\n
                    """)
                
                
                return Response({
                    "message": "User created",
                    "user": request.data
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
            name = request.data.get("name")
            last_name = request.data.get("lastName")
            email = request.data.get("email")
            password = request.data.get("password")
            password2 = request.data.get("password2")
            
            user = User(name, last_name, email, password)
            user.save()

            logger.info(
                    f"""
                    User logined:\n
                    name: {name}\n
                    lastname: {last_name}\n
                    email: {email}\n
                    password: {password}\n
                    """)

            return Response({
                'user': request.data,
                'message': 'User logged in successfully'
                }, status=200)
            
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