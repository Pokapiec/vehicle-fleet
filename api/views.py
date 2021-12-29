from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_205_RESET_CONTENT

from .models import Zlecenie
from .serializers import ZlecenieListaSerializer, ZlecenieDetalSerializer, MyTokenObtainPairSerializer

from .permissions import TylkoKlient, TylkoNaukowiec, TylkoZleceniodawca

# Create your views here.


class BlackListTokenView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class ZlecenieListView(APIView):
    permission_classes = [TylkoKlient]

    def get(self, request, *args, **kwargs):
        zlecenia = Zlecenie.objects.filter(klient__user__id=request.user.id)

        return Response(ZlecenieListaSerializer(zlecenia, many=True).data)


class ZlecenieDetalView(RetrieveAPIView):
    permission_classes = [TylkoZleceniodawca]

    queryset = Zlecenie.objects.all()
    serializer_class = ZlecenieDetalSerializer
