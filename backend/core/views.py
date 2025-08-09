import mimetypes

from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.http import FileResponse, Http404
from django.core.mail import EmailMessage
from django.utils import timezone

from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .models import (
    Drop, UserDropBookmark
)

from .serializers import ( 
    RegisterSerializer, DropSerializer,
    BookmarkSerializer
)

# Create your views here.

@api_view(['GET'])
def health_check(request):
    """Health check endpoint for monitoring."""
    return Response({"status": "healthy", "message": "DropZone API is running"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "username": user.username,
        "email": user.email,
    })

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        
        # Render onboarding email
        subject = "🔥 Welcome to DropZone!"
        html_message = render_to_string("emails/welcome.html", {
            "username": user.username,
        })
        email = EmailMessage(
            subject,
            html_message,
            to=[user.email],
        )
        email.content_subtype = "html"  # Send as HTML
        email.send()
        
# 1. Released Drops
class ReleasedDropsView(generics.ListAPIView):
    serializer_class = DropSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Drop.objects.filter(release_time__lte=timezone.now()).order_by('-release_time')

    def get_serializer_context(self):
        return {'request': self.request}

# 2. Upcoming Drops
class UpcomingDropsView(generics.ListAPIView):
    serializer_class = DropSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Drop.objects.filter(release_time__gt=timezone.now()).order_by('release_time')
    
    def get_serializer_context(self):
        return {'request': self.request}

# 3. Drop Detail
class DropDetailView(generics.RetrieveAPIView):
    queryset = Drop.objects.all()
    serializer_class = DropSerializer
    permission_classes = [permissions.IsAuthenticated]
    

# 4. Bookmark or Unbookmark a Drop
class ToggleBookmarkView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, drop_id):
        user = request.user
        try:
            drop = Drop.objects.get(id=drop_id)
        except Drop.DoesNotExist:
            return Response({"error": "Drop not found."}, status=status.HTTP_404_NOT_FOUND)

        bookmark, created = UserDropBookmark.objects.get_or_create(user=user, drop=drop)
        if not created:
            bookmark.delete()
            return Response({"message": "Bookmark removed."}, status=status.HTTP_200_OK)
        return Response({"message": "Bookmarked!"}, status=status.HTTP_201_CREATED)

class DropDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, drop_id):
        try:
            drop = get_object_or_404(Drop, pk=drop_id)
        except Http404:
            return Response({"error": "Drop not found."}, status=404)

        # Check if the drop is released
        if timezone.now() < drop.release_time:
            return Response({"error": "This drop is not yet released."}, status=403)

        # Check if the drop has a file
        if not drop.file:
            return Response({"error": "No file attached to this drop."}, status=404)

        # Serve the file
        file_path = drop.file.path
        
        # Determine the file's content type
        content_type, _ = mimetypes.guess_type(file_path)
        if content_type is None:
            content_type = 'application/octet-stream' # Fallback for unknown types

        # Use os.path.basename to get a safe filename for the attachment
        filename = os.path.basename(drop.file.name)
        
        try:
            response = FileResponse(open(file_path, 'rb'), content_type=content_type)
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response
        except FileNotFoundError:
            return Response({"error": "File not found on the server."}, status=404)
        except Exception as e:
            # You might want to log this error
            return Response({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
    
# 5. Get All Bookmarked Drops
class BookmarkedDropsView(generics.ListAPIView):
    serializer_class = DropSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Drop.objects.filter(userdropbookmark__user=self.request.user)
    
    def get_serializer_context(self):
        return {'request': self.request}