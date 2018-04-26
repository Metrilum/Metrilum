from django.db import models


# Create your models here.
class Project(models.Model):
    name = models.TextField(blank=False)


class Persona(models.Model):
    real_id = models.TextField


class Event(models.Model):
    account = models.ForeignKey
    time = models.DateTimeField
    name = models.TextField
    visitor_id = models.IntegerField
    real_visitor_id = models.TextField
    session_id = models.IntegerField
    user_agent = models.TextField
    href = models.TextField
    referer = models.TextField
