from rest_framework import serializers
from datetime import timedelta
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Zlecenie, Pojazd, Pomiar, Polozenie


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        try:
            token['czy_naukowiec'] = user.klient.czy_naukowiec
        except:
            token['czy_naukowiec'] = False
        return token


class ZlecenieListaSerializer(serializers.ModelSerializer):
    trasa = serializers.StringRelatedField(source='docelowa_trasa')

    class Meta:
        model = Zlecenie
        fields = ['id', 'typ_pojazdu', 'trasa', 'planowana_data_realizacji',
                  'rozpoczecie_realizacji', 'koniec_realizacji']


class PomiarSerializer(serializers.ModelSerializer):
    mierzona_wielkosc = serializers.StringRelatedField()

    class Meta:
        model = Pomiar
        fields = ['id', 'mierzona_wielkosc',
                  'wartosc', 'czy_norma_przekroczona']


class GrupaPomiarowSerializer(serializers.ModelSerializer):
    czujniki = serializers.SerializerMethodField()

    class Meta:
        model = Polozenie
        fields = ['id', 'timestamp', 'szerokosc_geo',
                  'dlugosc_geo', 'czujniki']

    def get_czujniki(self, instance):
        lower_timestamp = instance.timestamp - timedelta(milliseconds=100)
        higher_timestamp = instance.timestamp + timedelta(milliseconds=100)
        pomiary = instance.pojazd.pomiary.filter(
            timestamp__lte=higher_timestamp, timestamp__gte=lower_timestamp).order_by('mierzona_wielkosc__nazwa')
        return PomiarSerializer(pomiary, many=True).data


class GrupaPrzekroczenSerializer(serializers.ModelSerializer):
    czujniki = serializers.SerializerMethodField()
    zdjecie = serializers.SerializerMethodField()
    id_zlecenia = serializers.SerializerMethodField()
    trasa = serializers.SerializerMethodField()

    class Meta:
        model = Polozenie
        fields = ['id', 'timestamp', 'szerokosc_geo',
                  'dlugosc_geo', 'zdjecie', 'id_zlecenia', 'trasa', 'czujniki']

    def get_czujniki(self, instance):
        lower_timestamp = instance.timestamp - timedelta(milliseconds=100)
        higher_timestamp = instance.timestamp + timedelta(milliseconds=100)
        pomiary = instance.pojazd.pomiary.filter(
            timestamp__lte=higher_timestamp, timestamp__gte=lower_timestamp).order_by('mierzona_wielkosc__nazwa')
        return PomiarSerializer(pomiary, many=True).data

    def get_zdjecie(self, instance):
        lower_timestamp = instance.timestamp - timedelta(seconds=1)
        higher_timestamp = instance.timestamp + timedelta(seconds=1)
        zdjecia = instance.pojazd.zdjecia.filter(
            timestamp__lte=higher_timestamp, timestamp__gte=lower_timestamp)

        if len(zdjecia) == 0:
            return None

        return zdjecia[0].url

    def get_id_zlecenia(self, instance):
        zlecenia = Zlecenie.objects.filter(
            pojazd__id=instance.pojazd.id,
            rozpoczecie_realizacji__lte=instance.timestamp,
            koniec_realizacji__gte=instance.timestamp)

        if len(zlecenia) == 0:
            return None
        return zlecenia[0].id

    def get_trasa(self, instance):
        zlecenia = Zlecenie.objects.filter(
            pojazd__id=instance.pojazd.id,
            rozpoczecie_realizacji__lte=instance.timestamp,
            koniec_realizacji__gte=instance.timestamp)

        if len(zlecenia) == 0:
            return None
        return zlecenia[0].docelowa_trasa.nazwa


class ZlecenieDetalSerializer(serializers.ModelSerializer):
    trasa = serializers.StringRelatedField(source='docelowa_trasa')
    nagranie = serializers.StringRelatedField(source='film')
    pomiary = serializers.SerializerMethodField()
    przekroczenia = serializers.SerializerMethodField()

    class Meta:
        model = Zlecenie
        fields = ['id', 'typ_pojazdu', 'data_powstania',
                  'planowana_data_realizacji', 'rozpoczecie_realizacji', 'koniec_realizacji', 'trasa', 'nagranie', 'pomiary', 'przekroczenia']

    def get_pomiary(self, instance):
        if not instance.pojazd:
            return []

        polozenia_ze_zlecenia = instance.pojazd.polozenia.filter(
            timestamp__gte=instance.rozpoczecie_realizacji,
            timestamp__lte=instance.koniec_realizacji)

        return GrupaPomiarowSerializer(polozenia_ze_zlecenia, many=True, read_only=True).data

    def get_przekroczenia(self, instance):
        if not instance.pojazd:
            return []

        przekroczenia_ze_zlecenia = instance.pojazd.pomiary.filter(
            timestamp__gte=instance.rozpoczecie_realizacji,
            timestamp__lte=instance.koniec_realizacji,
            czy_norma_przekroczona=True)

        czyste_przekroczenia_ze_zlecenia = []
        polozenia_z_przekroczeniami = []

        for przekroczenie in przekroczenia_ze_zlecenia:
            lower_timestamp = przekroczenie.timestamp - \
                timedelta(milliseconds=200)
            higher_timestamp = przekroczenie.timestamp + \
                timedelta(milliseconds=200)
            polozenie_zawarte = False

            for czyste in czyste_przekroczenia_ze_zlecenia:
                if czyste.timestamp > lower_timestamp and czyste.timestamp < higher_timestamp:
                    polozenie_zawarte = True
                    break

            if not polozenie_zawarte:
                nowe_przekroczenia = instance.pojazd.polozenia.filter(
                    timestamp__gte=lower_timestamp, timestamp__lte=higher_timestamp)

                if len(nowe_przekroczenia) > 0:
                    polozenia_z_przekroczeniami.append(nowe_przekroczenia[0])

        return GrupaPrzekroczenSerializer(polozenia_z_przekroczeniami, many=True, read_only=True).data


class GrupaPomiarowDetalSerializer(serializers.ModelSerializer):
    czujniki = serializers.SerializerMethodField()
    id_zlecenia = serializers.SerializerMethodField()
    trasa = serializers.SerializerMethodField()

    class Meta:
        model = Polozenie
        fields = ['id', 'id_zlecenia', 'timestamp', 'trasa', 'szerokosc_geo',
                  'dlugosc_geo', 'czujniki']

    def get_czujniki(self, instance):
        lower_timestamp = instance.timestamp - timedelta(milliseconds=100)
        higher_timestamp = instance.timestamp + timedelta(milliseconds=100)
        pomiary = instance.pojazd.pomiary.filter(
            timestamp__lte=higher_timestamp, timestamp__gte=lower_timestamp).order_by('mierzona_wielkosc__nazwa')
        return PomiarSerializer(pomiary, many=True).data

    def get_id_zlecenia(self, instance):
        zlecenia = Zlecenie.objects.filter(
            pojazd__id=instance.pojazd.id,
            rozpoczecie_realizacji__lte=instance.timestamp,
            koniec_realizacji__gte=instance.timestamp)

        if len(zlecenia) == 0:
            return None
        return zlecenia[0].id

    def get_trasa(self, instance):
        zlecenia = Zlecenie.objects.filter(
            pojazd__id=instance.pojazd.id,
            rozpoczecie_realizacji__lte=instance.timestamp,
            koniec_realizacji__gte=instance.timestamp)

        if len(zlecenia) == 0:
            return None
        return zlecenia[0].docelowa_trasa.nazwa
