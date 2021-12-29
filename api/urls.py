from django.urls import path, include

from .views import ZlecenieView

urlpatterns = [
    path('zlecenia/', ZlecenieView.as_view(), name='zlecenia'),
]
