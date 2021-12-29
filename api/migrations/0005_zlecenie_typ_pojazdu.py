# Generated by Django 3.2.9 on 2021-12-29 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20211229_1120'),
    ]

    operations = [
        migrations.AddField(
            model_name='zlecenie',
            name='typ_pojazdu',
            field=models.CharField(choices=[('D', 'Dron'), ('L', 'Łódka')], default='D', max_length=1),
            preserve_default=False,
        ),
    ]
