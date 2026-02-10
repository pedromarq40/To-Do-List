from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TarefaSerializer
from .models import Tarefa

# Create your views here.

class TarefaView(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

   

