from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from logging import getLogger

from cart.models import CartItem, Carts
from products.models import Product
from .serializers import CartItemsSerializer
from .utils import check_autheticated

logger = getLogger(__name__)


@api_view(["GET"])
def cart(request):
    try:
        cart = check_autheticated(request)

        items = CartItem.objects.filter(cart=cart).select_related('product')

        items_serializer = CartItemsSerializer(items, many=True)

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items_serializer.data
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
        cart = check_autheticated(request)

        if request.method == "POST":
            product = Product.objects.filter(pk=product_id).first()
            item = CartItem.objects.create(
                cart=cart,
                product=product,
                quantity=1
            )
            item.save()
        
        items = CartItem.objects.filter(cart=cart)

        items_serializer = CartItemsSerializer(items, many=True)

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items_serializer.data
        }, status=200)
    
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)


@api_view(["PUT"])
def cart_item_adding(request, item_id):
    try:
        cart = check_autheticated(request)

        if request.method == "PUT":
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart=cart, product=product).first()

            item.quantity += 1
            item.save()
        
        items = CartItem.objects.filter(cart=cart).select_related('product')

        items_serializer = CartItemsSerializer(items, many=True)

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items_serializer.data
        }, status=200)

    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    

@api_view(["PUT"])
def cart_item_removing(request, item_id):
    try:
        cart = check_autheticated(request)

        if request.method == "PUT":
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart=cart, product=product).first()

            item.quantity -= 1
            item.save()
        
        items = CartItem.objects.filter(cart=cart).select_related('product')

        items_serializer = CartItemsSerializer(items, many=True)

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items_serializer.data
        }, status=200)

    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    

@api_view(["DELETE"])
def cart_item_delete(request, item_id):
    try:
        cart = check_autheticated(request)

        if request.method == "DELETE":
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart=cart, product=product)

            item.delete()
            
        items = CartItem.objects.filter(cart=cart).select_related('product')

        items_serializer = CartItemsSerializer(items, many=True)

        return Response({
            "message": f"Cart details for {request.user}",
            "items": items_serializer.data
        }, status=200)

    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
    
    
@api_view(['GET'])
def cart_buy(request):
    try:
        
        
        return Response({}, status=200)
        
        
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)