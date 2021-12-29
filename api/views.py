from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_205_RESET_CONTENT
from datetime import timedelta

from .models import Zlecenie, Polozenie
from .serializers import ZlecenieListaSerializer, ZlecenieDetalSerializer, MyTokenObtainPairSerializer, GrupaPomiarowDetalSerializer, GrupaPrzekroczenSerializer

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


class PomiaryView(APIView):
    permission_classes = [TylkoNaukowiec]

    def get(self, request, *args, **kwargs):
        polozenia = Polozenie.objects.all()

        return Response(GrupaPomiarowDetalSerializer(polozenia, many=True).data)


class PrzekroczeniaView(APIView):
    permission_classes = [TylkoKlient]

    def get(self, request):
        polozenia = Polozenie.objects.filter(
            pojazd__zlecenia__klient__user__id=request.user.id)

        polozenia_z_przekroczeniami = []

        for polozenie in polozenia:
            czy_przekroczenie = False
            lower_timestamp = polozenie.timestamp - timedelta(milliseconds=200)
            higher_timestamp = polozenie.timestamp + \
                timedelta(milliseconds=200)
            pomiary = polozenie.pojazd.pomiary.filter(
                timestamp__gte=lower_timestamp, timestamp__lte=higher_timestamp)
            for pomiar in pomiary:
                if pomiar.czy_norma_przekroczona:
                    czy_przekroczenie = True
                    break
            if czy_przekroczenie:
                polozenia_z_przekroczeniami.append(polozenie)

        return Response(GrupaPrzekroczenSerializer(polozenia_z_przekroczeniami, many=True).data)
