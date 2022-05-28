import uuid
from django.db import models
from django.urls.base import reverse


class TodoRecord(models.Model):
    RECORD_TYPE = (
        ('text','Text'),
        ('audio','Audio'),
        ('video','Video')
    )
    text_record = models.CharField(max_length=250,null=True,blank=True)
    voice_record = models.FileField(upload_to="records")
    record_type = models.CharField(choices=RECORD_TYPE,max_length=20)
    status = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
