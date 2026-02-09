from django.urls import path
from .views import TarefaView

urlpatterns = [
    path('api/', TarefaView.as_view(), name='criar_tarefa'),
]