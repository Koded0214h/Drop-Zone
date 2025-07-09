import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DropDetail from './pages/DropDetail';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/drop/:id" element={<DropDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
