from django.urls import path, include
from .views import TarefaView, UsuarioregistroView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tarefa', TarefaView, basename='tarefa')

#viewset usa router e apiview usa path

urlpatterns = [
    path('', include(router.urls)),
    path('usuarios/', UsuarioregistroView.as_view())
]