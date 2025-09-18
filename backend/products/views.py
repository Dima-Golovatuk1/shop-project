from rest_framework.decorators import api_view
from rest_framework.response import Response

from cart.models import CartItem, Carts 
from products.models import Product

from .serializers import SingleProduct

from logging import getLogger

logger = getLogger(__name__)


@api_view(["GET", 'POST'])
def product(request, product_id):
    
    products = Product.objects.all()
    
    if request.method == 'POST':
        try:
            serializer = SingleProduct(product_id)
            
            if serializer.is_valid():
                product = serializer.save()
            
            user_cart = Carts.objects.get(request.user.id)
            user_cart.update({product_id: product})
                
            
            
        
            return Response({
                'item_id': product_id,
                'product': product,
                'user': request.user,
            })
            
        except Exception as e:
            logger.error("Error:\n", str(e))
            return Response({
                'message': 'error',
                'error': str(e)
            })
    try:        
        
        return Response({
                "message": f"Item {product_id} details for {request.user}",
                'products': products
            }, status=200)
            
    except Exception as e:
            logger.error("Error:\n", str(e))
            return Response({
                "message": "Error",
                "error": str(e)
            }, status=500)