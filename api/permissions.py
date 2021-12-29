from rest_framework.permissions import BasePermission

from .models import User


def czy_klient(request):
    try:
        User.objects.get(pk=request.user.id).klient
        return True
    except:
        return False


def czy_naukowiec(request):
    try:
        klient = User.objects.get(pk=request.user.id).klient
        return klient.czy_naukowiec
    except:
        return False


class TylkoKlient(BasePermission):
    message = 'Musisz być naszym klientem, aby móc się tu dostać.'

    def has_permission(self, request, view):
        return czy_klient(request)


class TylkoNaukowiec(BasePermission):
    message = 'Musisz być naukowcem, aby móc się tu dostać.'

    def has_permission(self, request, view):
        return czy_naukowiec(request)


class TylkoZleceniodawca(BasePermission):
    message = 'Musisz być zleceniodawcą, aby móc się tu dostać.'

    def has_permission(self, request, view):
        return czy_klient(request)

    def has_object_permission(self, request, view, obj):
        return obj.klient.user.id == request.user.id
