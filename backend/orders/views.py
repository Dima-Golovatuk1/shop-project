from rest_framework.decorators import api_view
from rest_framework.response import Response

from logging import getLogger

from orders.models import Order
from .serializers import OrderSerializer
from cart.utils import check_autheticated_cart

logger = getLogger(__name__)


@api_view(["GET"])
def thanks_for_order(request):
    try:      
        return Response({
            "message": f" Thanks for order! {request.user}",
        }, status=200)
            
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    

@api_view(["GET"])
def orders(request):
    try:
        if request.user.is_authenticated:
            orders = Order.objects.filter(user=request.user)
        else:
            orders = Order.objects.filter(session_key=request.session.session_key)

        orders = Order.objects.filter()

        serializer = OrderSerializer(orders, many=True)
        logger.info(serializer.data)
        
        return Response({
            "message": f"Order details for {request.user}",
            "products": serializer.data
        }, status=200)
            
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)