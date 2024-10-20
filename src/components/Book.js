import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you're using axios for API calls
import { useNavigate } from "react-router-dom"; // For navigation to the cart page
import './Book.css';
const Book = () => {
  const [query, setQuery] = useState(""); // Search query
  const [books, setBooks] = useState([]); // Fetched books
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [totalPages, setTotalPages] = useState(1); // Total pages available
  const [loading, setLoading] = useState(false); // Loading state
  const [cart, setCart] = useState([]); // Cart state to hold books added to cart

  const navigate = useNavigate(); // To navigate to other pages

  // Fetch books when query or pageIndex changes
  useEffect(() => {
    if (query) {
      fetchBooks();
    }
  }, [query, pageIndex]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/v1/books/search?searchCriteria=${query}&pageNo=${pageIndex}`);
      setBooks(response.data.content); // Assuming response includes books and totalPages
      setTotalPages(response.data.totalPages); // Set total pages
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPageIndex(1); // Reset to page 1 when searching
    fetchBooks();
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && pageIndex < totalPages) {
      setPageIndex(pageIndex + 1);
    } else if (direction === "prev" && pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  // Add book to cart
  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate("/cart"); // Assumes a Cart route is set up in your router
  };

  return (
    <div className="App">
      <h1>Book Search</h1>

      {/* Search Input */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading Indicator */}
      {loading && <p>Loading books...</p>}

      {/* Books List */}
      {!loading && books.length > 0 && (
        <div>
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <p>Author: {book.authorName}</p>
                <p>Price: ${book.bookPrice}</p>
                {/* Add to Cart Button */}
                <button onClick={() => addToCart(book)}>Add to Cart</button>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="pagination">
            <button onClick={() => handlePageChange("prev")} disabled={pageIndex === 1}>
              Previous
            </button>
            <span>
              Page {pageIndex} of {totalPages}
            </span>
            <button onClick={() => handlePageChange("next")} disabled={pageIndex === totalPages}>
              Next
            </button>
          </div>

          {/* Go to Cart Button */}
          <div className="cart-button">
            <button onClick={goToCart}>Go to Cart ({cart.length} items)</button>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && books.length === 0 && <p>No books found.</p>}
    </div>
  );
};

export default Book;
