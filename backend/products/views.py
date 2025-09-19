from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Product, Category, SubCategory
from cart.models import CartItem, Carts
from products.models import Product

from .serializers import SingleProductSerializer, ProductSerializer, CategorySerializer, SubCategorySerializer

from logging import getLogger

logger = getLogger(__name__)


@api_view(["GET"])
def get_all_products(request):
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


@api_view(["GET"])
def product(request, product_id):
    try:
        products = Product.objects.all()
        serializer = SingleProductSerializer(products, many=True)

        
        return Response(
            {
                "message": f"Item {product_id} details for {request.user}",
                "products": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
        
    except Product.DoesNotExist:
         return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
         
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response(
            {"Error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

 
@api_view(['POST'])
def buy_product(request, product_id):
    try:
        product = Product.objects.get(pk=product_id)

        serializer = SingleProductSerializer(instance=product)
        product_data = serializer.data

        user_cart = Carts.objects.get(user=request.user)

        user_cart.items.update({str(product_id): product_data})
        user_cart.save()

        return Response(
                {
                    "item_id": product_id,
                    "product": product_data,
                    "user": request.user.username,
                },
                status=status.HTTP_200_OK,
            )

    except Product.DoesNotExist:
        return Response(
                {"error": "Product not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
    except Carts.DoesNotExist:
        return Response(
                {"error": "Cart not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response(
                {"Error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR)
