from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TarefaSerializer
from .models import Tarefa
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class TarefaView(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

   

