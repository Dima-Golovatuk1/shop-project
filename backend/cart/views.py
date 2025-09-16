from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from logging import getLogger

from cart.models import CartItem, Carts
from products.models import Product

logger = getLogger(__name__)

@api_view(["GET"])
def cart(request):
    try:
        cart = Carts.objects.get_or_create(user_id="".join(request.user.id if request.user.is_authenticated else request.session.session_key)).first()
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items
        }, status=200)
            
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    

@api_view(["GET", "POST"])
def cart_items(request, product_id):
    try:
        cart, created = Carts.objects.get_or_create(user_id=f"{request.user.id if request.user.is_authenticated else request.session.session_key}")

        if request.method == "POST":
            product = Product.objects.filter(pk=product_id).first()
            item = CartItem.objects.create(
                cart_id=cart,
                product_id=product,
                quantity=1
            )
            item.save()
        
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items
        }, status=200)
    
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
