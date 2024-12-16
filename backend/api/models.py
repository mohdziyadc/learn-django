from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


"""
Some Pointers:
-> for unique -> username = models.CharField(max_length=100, unique=True)
-> id's are automatically created in models. It is by default an auto incrementing integer
-> For custom primary keys -> id = models.UUIDField(//primary_key=True//, default=uuid.uuid4, editable=False)
-> 1:1 mapping -> profile = models.OneToOneField(User)
-> 1:n mapping -> comments = models.ForeignKey(Post)
-> n:n mapping -> authors = models.ManyToManyField(Books)
-> for mapping a custom primary key with another model:
        -> Primary key in 1 model => username = models.CharField(max_length=100, primary_key=True)
        -> Linking the 2nd model =>  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes", to_field="username") 
"""
