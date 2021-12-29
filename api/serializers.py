from rest_framework import serializers

from .models import Zlecenie, Pojazd, Pomiar, Przekroczenie, DocelowaTrasa


class ZlecenieListaSerializer(serializers.ModelSerializer):
    trasa = serializers.StringRelatedField(source='docelowa_trasa')

    class Meta:
        model = Zlecenie
        fields = ['id', 'typ_pojazdu', 'trasa', 'planowana_data_realizacji',
                  'rozpoczecie_realizacji', 'koniec_realizacji']
