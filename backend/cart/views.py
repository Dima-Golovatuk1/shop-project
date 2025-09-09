from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from logging import getLogger

logger = getLogger(__name__)

@api_view(["GET"])
def cart(request):
    try:
        return Response({
            "message": f"Cart details for {request.user}"
        }, status=200)
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)