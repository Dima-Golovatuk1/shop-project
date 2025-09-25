from rest_framework.decorators import api_view
from rest_framework.response import Response

from logging import getLogger

from cart.models import CartItem
from products.models import Product
from orders.models import Order, OrderItem
from .serializers import CartItemsSerializer
from .utils import check_autheticated_cart

logger = getLogger(__name__)


@api_view(["GET"])
def cart(request):
    try:
        cart = check_autheticated_cart(request)

        items = CartItem.objects.filter(cart=cart)

        
        serializer = CartItemsSerializer(items, many=True)
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
    

@api_view(["GET", "POST"])
def cart_items(request):
    try:
        cart = check_autheticated_cart(request)
        product_id = request.data.get('product_id')

        if request.method == "POST":
            product = Product.objects.filter(pk=product_id).first()
            item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={
                    "quantity": 1,
                    "price": product.price
                    }
            )

            if not created:
                item.quantity += 1
                
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
def cart_item_adding(request):
    try:
        cart = check_autheticated_cart(request)
        item_id = request.data.get("item_id")

        if request.method == "PUT":
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart=cart, product=product).first()

            if item:
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
def cart_item_removing(request):
    try:
        cart = check_autheticated_cart(request)
        item_id = request.data.get("item_id")

        if request.method == "PUT":
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart=cart, product=product).first()

            if item:
                if item.quantity > 1:
                    item.quantity -= 1
                    item.save()
                else:
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
    

@api_view(["DELETE"])
def cart_item_delete(request):
    try:
        cart = check_autheticated_cart(request)
        item_id = request.data.get("item_id")

        if request.method == "DELETE":
            product = Product.objects.filter(pk=item_id).first()
            item = CartItem.objects.filter(cart=cart, product=product).first()
            
            if item:
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
        if request.method == "POST":
            first_name = request.data.get('first_name')
            last_name = request.data.get('last_name')
            middle_name = request.data.get('middle_name')
            phone_number = request.data.get('phone_number')
            payment_method = request.data.get('payment_number')
            shipping_address = request.data.get('shipping_address')

            data = {}

            total_price = 0

            if request.user.is_authenticated:
                data["user"] = request.user

            data.update({
                'first_name': first_name,
                'last_name': last_name,
                'middle_name': middle_name,
                'phone_number': phone_number,
                'payment_method': payment_method,
                'shipping_address': shipping_address,
                'total_price': total_price,
            })

            order, created = Order.objects.get_or_create(**data)

            
        
        return Response({}, status=200)
        
        
        
    except Exception as e:
        logger.error("Error:\n", str(e))
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)