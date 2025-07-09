from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class Drop(models.Model):
    CONTENT_TYPES = [
        ('doc', 'Private Document'),
        ('cheatsheet', 'Cheat Sheet'),
        ('repo', 'GitHub Repository'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPES)
    
    file = models.FileField(upload_to='drops/', null=True, blank=True)
    github_link = models.URLField(blank=True, null=True)

    is_free = models.BooleanField(default=True)
    release_time = models.DateTimeField()
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def is_released(self):
        from django.utils import timezone
        return timezone.now() >= self.release_time
    
class UserDropBookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    drop = models.ForeignKey(Drop, on_delete=models.CASCADE)
    bookmarked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'drop')  # Prevent double bookmarks

    def __str__(self):
        return f'{self.user.username} bookmarked {self.drop.title}'

class UserAccessLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    drop = models.ForeignKey(Drop, on_delete=models.CASCADE)
    accessed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} viewed {self.drop.title} at {self.accessed_at}'
