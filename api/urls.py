from django.urls import path

from .views import ZlecenieListView, ZlecenieDetalView
from .views import BlackListTokenView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', BlackListTokenView.as_view(), name='blacklist'),

    path('zlecenia/<int:pk>', ZlecenieDetalView.as_view(), name='zlecenie_detal'),
    path('zlecenia/', ZlecenieListView.as_view(), name='zlecenia_lista'),
]
