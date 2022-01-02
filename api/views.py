from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_205_RESET_CONTENT
from datetime import timedelta
from django.utils import timezone
from dateutil import parser

from .models import Zlecenie, Polozenie, MierzonaWielkosc, DocelowaTrasa
from .serializers import ZlecenieListaSerializer, ZlecenieDetalSerializer, MyTokenObtainPairSerializer, GrupaPrzekroczenSerializer, PomiarDetalSerializer, MierzonaWielkoscSerializer, TrasaSerializer

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
        zlecenia = Zlecenie.objects.filter(
            pojazd__isnull=False, koniec_realizacji__isnull=False)

        if 'trasa' in request.query_params:
            zlecenia = zlecenia.filter(
                docelowa_trasa__nazwa=request.query_params['trasa'])

        if 'zlecenie' in request.query_params:
            zlecenia = zlecenia.filter(id=request.query_params['zlecenie'])

        from_filter = parser.parse(
            request.query_params['timestamp_from'] + " +01") if 'timestamp_from' in request.query_params else parser.parse('1900-01-01 00:00 +01')
        to_filter = parser.parse(
            request.query_params['timestamp_to'] + " +01") if 'timestamp_to' in request.query_params else timezone.now()

        wszystkie_pomiary = []

        for zlecenie in zlecenia:
            pomiary = zlecenie.pojazd.pomiary.filter(
                timestamp__gte=zlecenie.rozpoczecie_realizacji,
                timestamp__lte=zlecenie.koniec_realizacji)

            pomiary = pomiary.filter(
                timestamp__gte=from_filter, timestamp__lte=to_filter)

            if 'mierzona_wielkosc' in request.query_params:
                pomiary = pomiary.filter(
                    mierzona_wielkosc__nazwa=request.query_params['mierzona_wielkosc'])

            if 'wartosc_from' in request.query_params:
                pomiary = pomiary.filter(
                    wartosc__gte=request.query_params['wartosc_from'])

            if 'wartosc_to' in request.query_params:
                pomiary = pomiary.filter(
                    wartosc__lte=request.query_params['wartosc_to'])

            if 'przekroczenie' in request.query_params:
                want_przekroczone = request.query_params['przekroczenie'] == 'true'
                pomiary = pomiary.filter(
                    czy_norma_przekroczona=want_przekroczone)

            wszystkie_pomiary.append(pomiary)

        return Response(PomiarDetalSerializer(flatten(wszystkie_pomiary), many=True).data)


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


def flatten(t):
    return [item for sublist in t for item in sublist]


class FilterInfoView(APIView):
    permission_classes = [TylkoNaukowiec]

    def get(self, request):
        mierzone_wielkosci = MierzonaWielkosc.objects.all()
        mierzone_wielkosci_serializer = MierzonaWielkoscSerializer(
            mierzone_wielkosci, many=True)

        trasy = DocelowaTrasa.objects.all()
        trasy_serializer = TrasaSerializer(trasy, many=True)
        return Response({
            "mierzone_wartosci": mierzone_wielkosci_serializer.data,
            "trasy": trasy_serializer.data
        })
