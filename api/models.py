from django.db import models

# Create your models here.

from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):

        if not email:
            raise ValueError('You must provide an email address')

        email = self.normalize_email(email)
        user = self.model(email=email,
                          **other_fields)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


class Klient(models.Model):
    nazwa = models.CharField(max_length=150, unique=True)
    nip = models.PositiveIntegerField(
        validators=[MinValueValidator(1_000_000_000), MaxValueValidator(9_999_999_999)], unique=True, blank=True, null=True)
    czy_naukowiec = models.BooleanField(default=False)

    user = models.OneToOneField(
        'User', on_delete=models.CASCADE, related_name="klient")

    def __str__(self):
        return self.nazwa


class Film(models.Model):
    url = models.URLField()


class DocelowaTrasa(models.Model):
    nazwa = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.nazwa


class Model(models.Model):
    TYP = [
        ('D', 'Dron'),
        ('L', 'Łódka'),
    ]
    MARKA = [
        ('DJI', 'DJI'),
        ('SYM', 'Syma'),
        ('HUB', 'Hubsan'),
        ('BSH', 'Berkshire')
    ]

    typ = models.CharField(
        max_length=1,
        choices=TYP
    )

    marka = models.CharField(
        max_length=3,
        choices=MARKA
    )

    kod_modelu = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.marka + " | " + self.kod_modelu


class MierzonaWielkosc(models.Model):
    nazwa = models.CharField(max_length=150, unique=True)
    norma_min = models.FloatField(blank=True, null=True)
    norma_max = models.FloatField(blank=True, null=True)


class Pojazd(models.Model):
    numer_seryjny = models.CharField(max_length=50)

    model = models.ForeignKey('Model', on_delete=models.CASCADE)

    def __str__(self):
        return self.model.marka + " | " + self.numer_seryjny


class Pomiar(models.Model):
    timestamp = models.DateTimeField()
    wartosc = models.FloatField()

    mierzona_wielkosc = models.ForeignKey(
        'MierzonaWielkosc', on_delete=models.CASCADE)
    pojazd = models.ForeignKey(
        'Pojazd', on_delete=models.CASCADE, related_name='pomiary')


class Zdjecie(models.Model):
    url = models.URLField()
    timestamp = models.DateTimeField()

    pojazd = models.ForeignKey(
        'Pojazd', on_delete=models.CASCADE, related_name='zdjecia')


class Polozenie(models.Model):
    timestamp = models.DateTimeField()
    szerokosc_geo = models.DecimalField(max_digits=9, decimal_places=6)
    dlugosc_geo = models.DecimalField(max_digits=9, decimal_places=6)

    pojazd = models.ForeignKey(
        'Pojazd', on_delete=models.CASCADE, related_name='polozenia')


class Przekroczenie(models.Model):
    timestamp = models.DateTimeField()

    zdjecie = models.ForeignKey('Zdjecie', on_delete=models.DO_NOTHING)
    polozenie = models.ForeignKey('Polozenie', on_delete=models.DO_NOTHING)
    pomiar = models.ManyToManyField('Pomiar')
    pojazd = models.ForeignKey(
        'Pojazd', on_delete=models.CASCADE, related_name='przekroczenia')


class Zlecenie(models.Model):
    TYP = [
        ('D', 'Dron'),
        ('L', 'Łódka'),
    ]

    data_powstania = models.DateTimeField(auto_now_add=True)
    planowana_data_realizacji = models.DateTimeField()
    rozpoczecie_realizacji = models.DateTimeField(null=True, blank=True)
    koniec_realizacji = models.DateTimeField(null=True, blank=True)
    typ_pojazdu = models.CharField(max_length=1, choices=TYP)

    pojazd = models.ForeignKey(
        'Pojazd', on_delete=models.DO_NOTHING, related_name='zlecenia', null=True, blank=True)
    docelowa_trasa = models.ForeignKey(
        'DocelowaTrasa', on_delete=models.DO_NOTHING, related_name='zlecenia')
    film = models.ForeignKey(
        'Film', on_delete=models.CASCADE, related_name='zlecenia', null=True, blank=True)
    klient = models.ForeignKey(
        'Klient', on_delete=models.DO_NOTHING, related_name='zlecenia')

    def __str__(self):
        return f'{self.klient.nazwa} | {self.docelowa_trasa.nazwa} | {self.planowana_data_realizacji}'
