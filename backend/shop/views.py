from rest_framework.decorators import api_view, router
from rest_framework.response import Response

from logging import getLogger

logger = getLogger(__name__)

@api_view(["GET"])
def index(request):
    try:
        return Response({
            "message": f"Welcome {request.user}"
        }, status=200)
        
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    
