import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropCard from '../components/DropCard';
import api from '../api/axios';

const Bookmarks = () => {
  const navigate = useNavigate();
  const [bookmarkedDrops, setBookmarkedDrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/api/bookmarks/');
      setBookmarkedDrops(response.data || []);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      setError('Failed to load bookmarks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (dropId) => {
    // Remove from bookmarks list when unbookmarked
    setBookmarkedDrops(prev => prev.filter(drop => drop.id !== dropId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Bookmarks</h1>
              <p className="text-gray-600">
                {bookmarkedDrops.length} saved {bookmarkedDrops.length === 1 ? 'resource' : 'resources'}
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Bookmarks Grid */}
        {bookmarkedDrops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedDrops.map(drop => (
              <DropCard 
                key={drop.id} 
                drop={drop} 
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">⭐</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No bookmarks yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring drops and bookmark your favorite resources to find them here later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
              >
                Explore Drops
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 transition duration-200 ease-in-out"
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks; 