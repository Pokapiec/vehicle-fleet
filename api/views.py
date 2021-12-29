from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Zlecenie
from .serializers import ZlecenieListaSerializer

# Create your views here.


class ZlecenieView(APIView):
    def get(self, request, *args, **kwargs):
        # Tu zrobić tylko danego użytkownika
        zlecenia = Zlecenie.objects.all()

        return Response(ZlecenieListaSerializer(zlecenia, many=True).data)
