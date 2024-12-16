from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.serializers import UserSerializer


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    # letting the view know to interact with which object in the db
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
