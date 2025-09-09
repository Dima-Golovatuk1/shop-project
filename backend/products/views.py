from rest_framework.decorators import api_view, router
from rest_framework.response import Response


@api_view(["GET"])
def product(request, id_):
    try:
        return Response({
            "message": f"Item {id_} details for {request.user}"
        }, status=200)
        
    except Exception as e:
        return Response({
            "message": "Error",
            "error": str(e)
        }, status=500)
        
        
@api_view(['POST'])
def buy_product(request, id_):
    try:
        
        # user_cart = UserCart(request.user)
        # user_cart.update({id_: id_.object})
        # user_cart.save()
        
        return Response({
            'item_id': id_,
            'user': request.user,
        })
        
    except Exception as e:
        return Response({
            'message': 'error',
            'error': str(e)
        })