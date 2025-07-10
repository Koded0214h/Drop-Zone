import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vault } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-xl rounded-2xl mx-2 mt-4 sticky top-0 z-50 border border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigate('/')}> 
            <Vault className="w-9 h-9 text-blue-600" />
            <span className="text-2xl font-extrabold text-blue-700 tracking-tight">
              DropZone
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:text-white hover:bg-blue-600 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/bookmarks')}
                  className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:text-white hover:bg-cyan-600 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                  Bookmarks
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl font-medium bg-red-500 text-white hover:bg-pink-500 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 rounded-xl font-medium text-gray-700 hover:text-white hover:bg-blue-600 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 rounded-xl font-medium bg-blue-600 text-white hover:bg-purple-700 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden rounded-xl shadow-lg bg-white/90 border border-blue-100 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-xl text-gray-700 hover:text-white hover:bg-blue-600 font-medium transition-all duration-200 shadow-sm"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate('/bookmarks');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-xl text-gray-700 hover:text-white hover:bg-cyan-600 font-medium transition-all duration-200 shadow-sm"
                  >
                    Bookmarks
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-pink-500 font-medium transition-all duration-200 shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-xl text-gray-700 hover:text-white hover:bg-blue-600 font-medium transition-all duration-200 shadow-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-purple-700 font-medium transition-all duration-200 shadow-lg"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 