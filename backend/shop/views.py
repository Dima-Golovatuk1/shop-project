from rest_framework.decorators import api_view
from rest_framework.response import Response

from products.models import Product, Category, SubCategory

from logging import getLogger

logger = getLogger(__name__)

@api_view(["GET"])
def index(request):
    try:
        products = Product.objects.all()
        return Response({
            "message": f"welcome {request.user}",
            "products": products,
            "category": Category,
            "sub_category": SubCategory
        }, status=200)
        
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    
