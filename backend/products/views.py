from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from cart.models import CartItem, Carts
from products.models import Product

from .serializers import SingleProductSerializer

from logging import getLogger

logger = getLogger(__name__)


@api_view(["GET", "POST"])
def product(request, product_id):
    if request.method == "POST":
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
            logger.error("Error:\n%s", str(e))
            return Response(
                {"message": "error", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

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

    except Exception as e:
        logger.error("Error:\n%s", str(e))
        return Response(
            {"message": "Error", "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
