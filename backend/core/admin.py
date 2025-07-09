from django.contrib import admin
from .models import Drop, UserDropBookmark, UserAccessLog

# Register your models here.
admin.site.register(Drop)
admin.site.register(UserDropBookmark)
admin.site.register(UserAccessLog)