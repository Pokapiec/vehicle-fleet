# Generated by Django 3.2.9 on 2021-12-29 10:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211229_1118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='zlecenie',
            name='film',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='zlecenia', to='api.film'),
        ),
        migrations.AlterField(
            model_name='zlecenie',
            name='pojazd',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='zlecenia', to='api.pojazd'),
        ),
    ]
