import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const DropCard = ({ drop, onBookmarkToggle, showBookmark = true }) => {
  const navigate = useNavigate();
  const [isBookmarking, setIsBookmarking] = useState(false);

  const handleBookmarkToggle = async (e) => {
    e.stopPropagation();
    if (!onBookmarkToggle) return;
    
    setIsBookmarking(true);
    try {
      await api.post(`/api/drops/${drop.id}/bookmark/`);
      onBookmarkToggle(drop.id);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsBookmarking(false);
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'doc':
        return '📄';
      case 'cheatsheet':
        return '📋';
      case 'repo':
        return '📦';
      default:
        return '📁';
    }
  };

  const getContentTypeLabel = (type) => {
    switch (type) {
      case 'doc':
        return 'Private Document';
      case 'cheatsheet':
        return 'Cheat Sheet';
      case 'repo':
        return 'GitHub Repository';
      default:
        return 'Resource';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
      onClick={() => navigate(`/drop/${drop.id}`)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getContentTypeIcon(drop.content_type)}</span>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {getContentTypeLabel(drop.content_type)}
            </span>
          </div>
          {showBookmark && (
            <button
              onClick={handleBookmarkToggle}
              disabled={isBookmarking}
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
            >
              {isBookmarking ? (
                <span className="text-sm">...</span>
              ) : (
                <span className="text-xl">
                  {drop.is_bookmarked ? '⭐' : '☆'}
                </span>
              )}
            </button>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {drop.title}
        </h3>
        
        {drop.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {drop.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Released {formatDate(drop.release_time)}</span>
          {drop.is_free ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span className="text-orange-600 font-medium">Premium</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropCard; 