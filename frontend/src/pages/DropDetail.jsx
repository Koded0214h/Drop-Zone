import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const DropDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drop, setDrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [bookmarking, setBookmarking] = useState(false);

  useEffect(() => {
    fetchDropDetails();
  }, [id]);

  const fetchDropDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get(`/api/drops/${id}/`);
      setDrop(response.data);
    } catch (err) {
      console.error('Error fetching drop details:', err);
      setError('Failed to load drop details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await api.get(`/api/drops/${id}/download/`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', drop.title || 'drop-file');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading file:', err);
      setError('Failed to download file. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const handleBookmarkToggle = async () => {
    setBookmarking(true);
    try {
      await api.post(`/api/drops/${id}/bookmark/`);
      setDrop(prev => ({ ...prev, is_bookmarked: !prev.is_bookmarked }));
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      setError('Failed to update bookmark. Please try again.');
    } finally {
      setBookmarking(false);
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading drop details...</p>
        </div>
      </div>
    );
  }

  if (error || !drop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Drop not found</h3>
          <p className="text-gray-600 mb-4">{error || 'This drop doesn\'t exist or has been removed.'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <span className="mr-2">←</span>
          Back
        </button>

        {/* Drop Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{getContentTypeIcon(drop.content_type)}</span>
                <div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {getContentTypeLabel(drop.content_type)}
                  </span>
                  {drop.is_free ? (
                    <span className="ml-2 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="ml-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleBookmarkToggle}
                disabled={bookmarking}
                className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 text-2xl"
              >
                {bookmarking ? (
                  <span className="text-sm">...</span>
                ) : (
                  <span>{drop.is_bookmarked ? '⭐' : '☆'}</span>
                )}
              </button>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{drop.title}</h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span>Released {formatDate(drop.release_time)}</span>
            </div>

            {drop.description && (
              <p className="text-gray-700 text-lg leading-relaxed">{drop.description}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              {drop.file && (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
                >
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">⬇️</span>
                      Download File
                    </>
                  )}
                </button>
              )}
              
              {drop.github_link && (
                <a
                  href={drop.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
                >
                  <span className="mr-2">🔗</span>
                  View Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDetail; 