from django.db import models

# Create your models here.

tarefa_esta_concluida = lambda x : 'concluida' if x else 'pendente'

class Tarefa(models.Model):

    tarefa = models.CharField(('tarefa'), max_length=50)
    concluida = models.BooleanField(('concluida'), default=False)

    @property
    def status(self):
        return 'concluida' if self.concluida else 'pendente'

    def __str__(self):
        return f'{self.tarefa} - {tarefa_esta_concluida(self.concluida)}'