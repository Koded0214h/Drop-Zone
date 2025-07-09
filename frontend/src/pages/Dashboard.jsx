import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DropCard from '../components/DropCard';
import api from '../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [releasedDrops, setReleasedDrops] = useState([]);
  const [bookmarkedDrops, setBookmarkedDrops] = useState([]);
  const [upcomingDrops, setUpcomingDrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    // Decode JWT to get user email
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserEmail(payload.email || 'User');
    } catch (error) {
      console.error('Error decoding token:', error);
      setUserEmail('User');
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const [releasedRes, bookmarksRes, upcomingRes] = await Promise.all([
        api.get('/api/drops/released/'),
        api.get('/api/bookmarks/'),
        api.get('/api/drops/upcoming/')
      ]);

      setReleasedDrops(releasedRes.data || []);
      setBookmarkedDrops(bookmarksRes.data || []);
      setUpcomingDrops(upcomingRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (dropId) => {
    // Update bookmarked drops list
    setBookmarkedDrops(prev => {
      const isBookmarked = prev.some(drop => drop.id === dropId);
      if (isBookmarked) {
        return prev.filter(drop => drop.id !== dropId);
      } else {
        const dropToAdd = releasedDrops.find(drop => drop.id === dropId);
        return dropToAdd ? [...prev, { ...dropToAdd, is_bookmarked: true }] : prev;
      }
    });

    // Update released drops bookmark status
    setReleasedDrops(prev => 
      prev.map(drop => 
        drop.id === dropId 
          ? { ...drop, is_bookmarked: !drop.is_bookmarked }
          : drop
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userEmail}!
          </h1>
          <p className="text-gray-600">Discover and manage your development resources</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Released Drops Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Latest Drops</h2>
            <span className="text-sm text-gray-500">{releasedDrops.length} available</span>
          </div>
          
          {releasedDrops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {releasedDrops.map(drop => (
                <DropCard 
                  key={drop.id} 
                  drop={drop} 
                  onBookmarkToggle={handleBookmarkToggle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No drops available yet</h3>
              <p className="text-gray-600">Check back soon for new development resources!</p>
            </div>
          )}
        </section>

        {/* Bookmarked Drops Section */}
        {bookmarkedDrops.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Your Bookmarks</h2>
              <button 
                onClick={() => navigate('/bookmarks')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-4">
                {bookmarkedDrops.slice(0, 4).map(drop => (
                  <div key={drop.id} className="w-80 flex-shrink-0">
                    <DropCard 
                      drop={drop} 
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Drops Section */}
        {upcomingDrops.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Coming Soon</h2>
              <span className="text-sm text-gray-500">{upcomingDrops.length} upcoming</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingDrops.map(drop => (
                <div key={drop.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden opacity-75">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl">⏰</span>
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{drop.title}</h3>
                    {drop.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{drop.description}</p>
                    )}
                    <div className="text-sm text-gray-500">
                      Releases {new Date(drop.release_time).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Logout Button */}
        <div className="text-center pt-8">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 