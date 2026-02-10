from django.db import models

# Create your models here.

class Tarefa(models.Model):

    tarefa = models.CharField(('tarefa'), max_length=50)
    concluida = models.BooleanField(('concluida'), default=False)

    @property
    def status(self):
        return 'concluida' if self.concluida else 'pendente'

    def __str__(self):
        return f'{self.tarefa} - {self.concluida}'