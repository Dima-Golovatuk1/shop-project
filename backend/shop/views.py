from rest_framework.decorators import api_view
from rest_framework.response import Response

from products.models import Product, Category, SubCategory
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer

from logging import getLogger

logger = getLogger(__name__)

@api_view(["GET"])
def index(request):
    try:
        products = Product.objects.all()
        # categories = Category.objects.all()
        # sub_categories = SubCategory.objects.all()
        
        product_serializer = ProductSerializer(products, many=True)
        # category_serializer = CategorySerializer(categories, many=True)
        # sub_category_serializer = SubCategorySerializer(sub_categories, many=True)
        
        return Response({
            "message": f"welcome {request.user}",
            "products": product_serializer.data,
            # "categories": category_serializer.data,
            # "sub_categories": sub_category_serializer.data
        }, status=200)
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    
