from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

from products.models import Product, Category, SubCategory
from .serializers import ProductSerializer, CategorySerializer, SubCategorySerializer

from logging import getLogger

logger = getLogger(__name__)

@api_view(["GET"])
def index(request):
    try:
        products = Product.objects.all()
        categories = Category.objects.all()
        sub_categories = SubCategory.objects.all()
        
        product_serializer = ProductSerializer(products, many=True)
        category_serializer = CategorySerializer(categories, many=True)
        sub_category_serializer = SubCategorySerializer(sub_categories, many=True)
        
        return Response({
            "message": f"welcome {request.user}",
            "products": product_serializer.data,
            "categories": category_serializer.data,
            "sub_categories": sub_category_serializer.data
        }, status=200)
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    


@api_view(['GET'])
def search(request):
    try:
        query = request.GET.get('q') or None
        description = request.GET.get('d') or None
        price = request.GET.get('p') or None
        category = request.GET.get('c') or None
        sub_category = request.GET.get('sb') or None

        filters = Q()
        
        if query:
            filters &= Q(title__icontains=query)
        if description:
            filters &= Q(description__icontains=description)
        if price:
            filters &= Q(price__lte=price)  
        if category:
            filters &= Q(category__icontains=category)
        if sub_category:
            filters &= Q(subcategory__icontains=sub_category)
        
        products = Product.objects.filter(filters)
        
        if not products.exists():
            return Response({
                'message': 'No products found matching your criteria.',
            }, status=200)

        products_serializer = ProductSerializer(products, many=True)
        
        product_ids = [product.id for product in products]

        return Response({
            'message': f"Searched products: {len(product_ids)} found.",
            'product_ids': product_ids,
            'products': products_serializer.data,
            'filters': { 
                'query': query,
                'description': description,
                'price': price,
                'category': category,
                'sub_category': sub_category
            }
        }, status=200)
        
    except Exception as e:
        logger.error(f"Error:\n {str(e)}")
        return Response({
            'message': '\nError:\n',
            'error': str(e)
        }, status=500)
