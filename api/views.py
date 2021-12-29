from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Zlecenie
from .serializers import ZlecenieListaSerializer, ZlecenieDetalSerializer

# Create your views here.


class ZlecenieListView(APIView):
    def get(self, request, *args, **kwargs):
        # Tu zrobić tylko danego użytkownika
        zlecenia = Zlecenie.objects.all()

        return Response(ZlecenieListaSerializer(zlecenia, many=True).data)


class ZlecenieDetalView(APIView):
    def get(self, request, pk, *args, **kwargs):
        # Tu zrobić tylko danego użytkownika
        zlecenie = Zlecenie.objects.get(id=pk)

        return Response(ZlecenieDetalSerializer(zlecenie).data)
