from django.urls import path, include
from .views import TarefaView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'api', TarefaView, basename='tarefa')

urlpatterns = [
    path('', include(router.urls), name='criar_tarefa'),
]