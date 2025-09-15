from rest_framework.decorators import api_view
from rest_framework.response import Response

from cart.models import CartItem, Carts 
from products.models import Product

from logging import getLogger

logger = getLogger(__name__)

@api_view(["GET", 'POST'])
def product(request, id_):
    
    products = Product.objects.all()
    
    if request.method == 'POST':
        try:
            
            user_cart = Carts(request.user.id)
            user_cart.update({id_: id_.object})
            user_cart.save()
            
            
            return Response({
                'item_id': id_,
                'user': request.user,
                'cart': user_cart
            })
            
        except Exception as e:
            logger.error("Error:\n", str(e))
            return Response({
                'message': 'error',
                'error': str(e)
            })
    try:        
        
        return Response({
                "message": f"Item {id_} details for {request.user}",
                'products': products
            }, status=200)
            
    except Exception as e:
            logger.error("Error:\n", str(e))
            return Response({
                "message": "Error",
                "error": str(e)
            }, status=500)