﻿from django.urls import path
from . import views

urlpatterns = [
    path('process/', views.process_image, name='process_image'),
]
