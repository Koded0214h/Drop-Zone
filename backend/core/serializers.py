from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Drop, UserDropBookmark

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user

class DropSerializer(serializers.ModelSerializer):
    is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        model = Drop
        fields = '__all__'

    def get_is_bookmarked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return obj.userdropbookmark_set.filter(user=user).exists()
        return False

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDropBookmark
        fields = '__all__'