from rest_framework import serializers
from .models import Tarefa
from django.contrib.auth.models import User 

class TarefaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tarefa
        fields = ['id', 'tarefa', 'concluida', 'status'] #JWT

class UsuarioRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password' : {'write_only' : True}}

    def create(self, data):

        user = User.objects.create_user(
                username=data['username'],
                password=data['password']
        )
        return user
