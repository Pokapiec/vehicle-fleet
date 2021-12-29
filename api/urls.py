from django.urls import path

from .views import ZlecenieListView, ZlecenieDetalView

urlpatterns = [
    path('zlecenia/', ZlecenieListView.as_view(), name='zlecenia_lista'),
    path('zlecenia/<int:pk>', ZlecenieDetalView.as_view(), name='zlecenie_detal'),
]
