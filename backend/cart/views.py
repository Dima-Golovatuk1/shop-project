from rest_framework.decorators import api_view
from rest_framework.response import Response

from logging import getLogger

from cart.models import CartItem, Carts
from products.models import Product
from .serializers import CartItemsSerializer

logger = getLogger(__name__)


@api_view(["GET"])
def cart(request):
    try:
        user_identificator = ""

        if request.user.is_authenticated:
            user_identificator = request.user.id
        
        else:
            if not request.session.session_key:
                request.session.create()
            user_identificator = request.session.session_key

        cart, created = Carts.objects.get_or_create(user_id=user_identificator)
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

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
        user_identificator = ""

        if request.user.is_authenticated:
            user_identificator = request.user.id
        
        else:
            if not request.session.session_key:
                request.session.create()
            user_identificator = request.session.session_key

        cart, created = Carts.objects.get_or_create(user_id=user_identificator)

        if request.method == "POST":
            product = Product.objects.filter(pk=product_id).first()
            item = CartItem.objects.create(
                cart_id=cart,
                product_id=product,
                quantity=1
            )
            item.save()
        
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

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
        user_identificator = ""

        if request.user.is_authenticated:
            user_identificator = request.user.id
        
        else:
            if not request.session.session_key:
                request.session.create()
            user_identificator = request.session.session_key

        if request.method == "PUT":
            cart_id = Carts.objects.filter(user_id=user_identificator).first()
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart_id=cart_id, product_id=product)

            item.quantity += 1
            item.save()
        
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

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
        user_identificator = ""

        if request.user.is_authenticated:
            user_identificator = request.user.id
        
        else:
            if not request.session.session_key:
                request.session.create()
            user_identificator = request.session.session_key

        if request.method == "PUT":
            cart_id = Carts.objects.filter(user_id=user_identificator).first()
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart_id=cart_id, product_id=product)

            item.quantity -= 1
            item.save()
        
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

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
        user_identificator = ""

        if request.user.is_authenticated:
            user_identificator = request.user.id
        
        else:
            if not request.session.session_key:
                request.session.create()
            user_identificator = request.session.session_key

        if request.method == "DELETE":
            cart_id = Carts.objects.filter(user_id=user_identificator).first()
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart_id=cart_id, product_id=product)

            item.delete()
            
        items = CartItem.objects.filter(cart_id=cart).select_related('product')

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
    