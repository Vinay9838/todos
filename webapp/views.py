from django.contrib import messages
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404, render,redirect
from django.views.generic import ListView
from .models import TodoRecord


def record(request):
    if request.method == "POST":

        text_record = request.POST.get("text_record",None)
        record_type = request.POST.get("record_type",None)
        if record_type == 'text':
            record = TodoRecord.objects.create(record_type=record_type, text_record=text_record)
            return redirect('index')
        if record_type in ['audio','video']:
            media_file = request.FILES.get("recorded_audio")
            rec = TodoRecord.objects.create(record_type=record_type, voice_record=media_file)
            rec.save()
            return JsonResponse(
                {
                    "success": True,
                }
            )


class TodoList(ListView):
    template_name = "webapp/todo.html"
    model = TodoRecord

    def get_queryset(self):
        queryset = super(TodoList, self).get_queryset()
        return queryset.filter(status=1)

    def get_context_data(self, *args, object_list=None, **kwargs):
        context = super(TodoList, self).get_context_data(*args,**kwargs)
        context['history'] = self.model.objects.filter(status=0)
        return context


def todo_soft_delete(request,pk):
    try:
        TodoRecord.objects.filter(pk=pk).update(status=0)
    except Exception as e:
        print(e)

    return redirect('index')
