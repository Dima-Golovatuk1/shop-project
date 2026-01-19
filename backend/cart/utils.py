from .models import Carts
from orders.models import Order


def check_autheticated_cart(request):
    if request.user.is_authenticated:
        cart, created = Carts.objects.get_or_create(user=request.user)
    else:
        if not request.session.session_key:
            request.session.create()
        cart, created = Carts.objects.get_or_create(session_key=request.session.session_key)

    return cart
