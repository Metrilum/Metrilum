from django.urls import path

from . import views

urlpatterns = [
    path('', views.test_page, name='test'),
    path('collect', views.collect, name='collect'),
    path('collector.js', views.serve_script, name='collector')
]
