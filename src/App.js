import logo from './logo.svg';
import './App.css';
import Book from './components/Book';
import Cart from './components/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Book />} /> {/* Book search page */}
        <Route path="/cart" element={<Cart />} /> {/* Cart page */}
      </Routes>
    </div>
  </Router>
  );
}

export default App;
