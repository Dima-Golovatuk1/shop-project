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
        categories = Category.objects.all()
        sub_categories = SubCategory.objects.all()
        
        category_serializer = CategorySerializer(categories, many=True)
        sub_category_serializer = SubCategorySerializer(sub_categories, many=True)
        
        query = request.GET.get('q')
        price = request.GET.get('p')
        category = request.GET.get('c')
        sub_category = request.GET.get('sb')
        
        filters = Q()
        
        if query and query.strip():
            q = query.strip()
            filters &= (Q(title__icontains=q) | Q(description__icontains=q))
                        
        if price:
            price_float = float(price)
            if price_float > 0:
                filters &= Q(price__lte=price_float)


        if category and category.strip():
            filters &= Q(category__name__icontains=category.strip())
            
        if sub_category and sub_category.strip():
            filters &= Q(subcategory__name__icontains=sub_category.strip())

        products = Product.objects.filter(filters).distinct()
        
        if not products.exists():
            return Response({
                'message': 'No products found matching your criteria.',
                'products': [],
                'product_ids': [],
                'categories': category_serializer.data,
                'sub_categories': sub_category_serializer.data,
                'filters': {
                    'query': query,
                    'price': price,
                    'category': category,
                    'sub_category': sub_category
                }
            }, status=200)
        
        products_serializer = ProductSerializer(products, many=True)
        product_ids = [product.id for product in products]
        
        return Response({
            'message': f"Searched products: {len(product_ids)} found.",
            'product_ids': product_ids,
            'products': products_serializer.data,
            'categories': category_serializer.data,
            'sub_categories': sub_category_serializer.data,
            'filters': {
                'query': query,
                'price': price,
                'category': category,
                'sub_category': sub_category
            }
        }, status=200)
        
    except Exception as e:
        logger.error(f"Search API Error: {str(e)}")
        return Response({
            'message': 'An error occurred while searching.',
            'error': str(e)
        }, status=500)