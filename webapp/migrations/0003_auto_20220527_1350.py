# Generated by Django 3.1.7 on 2022-05-27 13:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0002_todorecord'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Record',
        ),
        migrations.RemoveField(
            model_name='todorecord',
            name='video_record',
        ),
    ]
