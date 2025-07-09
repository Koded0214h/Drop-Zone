import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              DropZone
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Unlock Dev Resources. One Drop at a Time.
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Join thousands of developers discovering exclusive cheat sheets, code bundles, and hidden gems crafted just for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg border-2 border-blue-600 transition duration-200 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign In
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Level Up
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From private documents to cheat sheets and GitHub repositories, we've got your development journey covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-6">📄</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Private Documents</h3>
              <p className="text-gray-600 leading-relaxed">
                Access exclusive documentation, guides, and resources that aren't available anywhere else.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-6">📋</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cheat Sheets</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick reference guides for frameworks, languages, and tools to boost your productivity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition duration-300">
              <div className="text-5xl mb-6">📦</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">GitHub Repositories</h3>
              <p className="text-gray-600 leading-relaxed">
                Curated code repositories with ready-to-use templates, components, and full-stack projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-600">
              See what our community has to say about DropZone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-600 text-sm">Full-Stack Developer</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "DropZone has been a game-changer for my development workflow. The cheat sheets alone have saved me hours of research time. Highly recommended!"
              </p>
              <div className="flex text-yellow-400 mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-lg mr-4">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marcus Rodriguez</div>
                  <div className="text-gray-600 text-sm">DevOps Engineer</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "The private documents section has some incredible resources that I couldn't find anywhere else. It's like having a secret weapon in my toolkit."
              </p>
              <div className="flex text-yellow-400 mt-4">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Level Up Your Development?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already discovering amazing resources on DropZone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
            >
              Join DropZone Free
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-transparent hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg text-lg border-2 border-white transition duration-200 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">DropZone</h3>
            <p className="text-gray-400 mb-6">
              Unlock Dev Resources. One Drop at a Time.
            </p>
            <div className="text-gray-500 text-sm">
              © 2024 DropZone. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 