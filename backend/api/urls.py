from django.urls import path

from api.views import NoteDeleteView, NoteListCreate


urlpatterns = [
    path("notes/create", NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>", NoteDeleteView.as_view(), name="note-delete"),
]
