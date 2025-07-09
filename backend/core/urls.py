from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('health/', views.health_check, name='health-check'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('drops/released/', views.ReleasedDropsView.as_view(), name='released-drops'),
    path('drops/upcoming/', views.UpcomingDropsView.as_view(), name='upcoming-drops'),
    path('drops/<int:pk>/', views.DropDetailView.as_view(), name='drop-detail'),
    path('drops/<int:drop_id>/bookmark/', views.ToggleBookmarkView.as_view(), name='toggle-bookmark'),
    path('drops/<int:drop_id>/download/', views.DropDownloadView.as_view(), name='drop-download'),
    path('bookmarks/', views.BookmarkedDropsView.as_view(), name='bookmarked-drops'),
]