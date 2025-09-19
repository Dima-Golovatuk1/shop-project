
def check_autheticated(request):
    user_identificator = ''
    if request.user.is_authenticated:
        user_identificator += request.user.id
    
    else:
        if not request.session.session_key:
            request.session.create()
        user_identificator += request.session.session_key

    return user_identificator
