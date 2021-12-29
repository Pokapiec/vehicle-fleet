# Generated by Django 3.2.9 on 2021-12-29 10:01

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DocelowaTrasa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=150, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Film',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Klient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=150, unique=True)),
                ('nip', models.PositiveIntegerField(blank=True, null=True, unique=True, validators=[django.core.validators.MinValueValidator(1000000000), django.core.validators.MaxValueValidator(9999999999)])),
                ('czy_naukowiec', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='klient', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MierzonaWielkosc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=150, unique=True)),
                ('norma_min', models.FloatField(blank=True, null=True)),
                ('norma_max', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('typ', models.CharField(choices=[('D', 'Dron'), ('L', 'Łódka')], max_length=1)),
                ('marka', models.CharField(choices=[('DJI', 'DJI'), ('SYM', 'Syma'), ('HUB', 'Hubsan'), ('BSH', 'Berkshire')], max_length=3)),
                ('kod_modelu', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Pojazd',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numer_seryjny', models.CharField(max_length=50)),
                ('model', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.model')),
            ],
        ),
        migrations.CreateModel(
            name='Polozenie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('szerokosc_geo', models.DecimalField(decimal_places=6, max_digits=9)),
                ('dlugosc_geo', models.DecimalField(decimal_places=6, max_digits=9)),
                ('pojazd', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='polozenia', to='api.pojazd')),
            ],
        ),
        migrations.CreateModel(
            name='Pomiar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('wartosc', models.FloatField()),
                ('mierzona_wielkosc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.mierzonawielkosc')),
                ('pojazd', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pomiary', to='api.pojazd')),
            ],
        ),
        migrations.CreateModel(
            name='Zlecenie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_powstania', models.DateTimeField(auto_now_add=True)),
                ('planowana_data_realizacji', models.DateTimeField()),
                ('rozpoczecie_realizacji', models.DateTimeField()),
                ('koniec_realizacji', models.DateTimeField()),
                ('docelowa_trasa', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='zlecenia', to='api.docelowatrasa')),
                ('film', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='zlecenia', to='api.film')),
                ('klient', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='zlecenia', to='api.klient')),
                ('pojazd', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='zlecenia', to='api.pojazd')),
            ],
        ),
        migrations.CreateModel(
            name='Zdjecie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField()),
                ('timestamp', models.DateTimeField()),
                ('pojazd', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='zdjecia', to='api.pojazd')),
            ],
        ),
        migrations.CreateModel(
            name='Przekroczenie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('pojazd', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='przekroczenia', to='api.pojazd')),
                ('polozenie', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.polozenie')),
                ('pomiar', models.ManyToManyField(to='api.Pomiar')),
                ('zdjecie', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.zdjecie')),
            ],
        ),
    ]
