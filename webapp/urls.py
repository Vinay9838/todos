from django.urls import path
from . import views


urlpatterns = [
    path("", views.TodoList.as_view(), name="index"),
    path("record/", views.record, name="record"),
    path('soft-delete/<int:pk>/',views.todo_soft_delete,name="soft_delete")

]