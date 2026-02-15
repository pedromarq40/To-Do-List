from django.db import models

# Create your models here.

class Tarefa(models.Model):

    tarefa = models.CharField(('tarefa'), max_length=50)
    concluida = models.BooleanField(('concluida'), default=False)
    #usuario = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def status(self):
        return 'concluida' if self.concluida else 'pendente'

    def __str__(self):
        return f'{self.tarefa} - {self.concluida}'