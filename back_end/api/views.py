from django.shortcuts import render
from rest_framework import viewsets, generics#so aceita post
from .serializer import TarefaSerializer, UsuarioRegistroSerializer
from .models import Tarefa
from rest_framework.permissions import IsAuthenticated, AllowAny#nao precisa do jwt
from django.contrib.auth.models import User

# Create your views here.

class TarefaView(viewsets.ModelViewSet):
    #queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): #retorna filtrado
        return Tarefa.objects.filter(usuario=self.request.user)
    
    def perform_create(self, serializer): #guarda no banco com usuario
        serializer.save(usuario=self.request.user)

class UsuarioregistroView(generics.CreateAPIView):
    # Troca ModelViewSet por generics.CreateAPIView, agora só da pra fazer post

    queryset = User.objects.all()
    serializer_class = UsuarioRegistroSerializer
    permission_classes = [AllowAny]

   

