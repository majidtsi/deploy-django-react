from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    
    #create a meta class
    class Meta:
        model=Todo
        fields=('id', 'title','description','completed')