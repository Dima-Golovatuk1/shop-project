from rest_framework.decorators import api_view
from rest_framework.response import Response

from logging import getLogger

from orders.models import Order
from .serializers import OrderSerializer
from cart.utils import check_autheticated_cart

logger = getLogger(__name__)


@api_view(["GET"])
def orders(request):
    try:
        cart = check_autheticated_cart(request)

        orders = Order.objects.filter(cart=cart)

        serializer = OrderSerializer(orders, many=True)
        logger.info(serializer.data)
        
        return Response({
            "message": f"Cart details for {request.user}",
            "products": serializer.data
        }, status=200)
            
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)