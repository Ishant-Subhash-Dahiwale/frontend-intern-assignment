import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Bookshelf from './Bookshelf';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookshelf, setBookshelf] = useState(JSON.parse(localStorage.getItem('bookshelf')) || []);

  useEffect(() => {
    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&limit=10&page=1`);
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/bookshelf" element={<Bookshelf bookshelf={bookshelf} />} />
          <Route 
            path="/" 
            element={
              <>
                <div className="header">
                  <div>
                  <strong>Search by book name:</strong>
                  <br></br>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        margin:'10px',
                      padding: '5px',
                      fontSize: '16px',
                      border: '2px solid black',
                      borderRadius: '8px',
                    }}
                  />
                  </div>
                  <div style={{marginTop:'-50px',marginLeft:'1200px' ,display: 'block'}}>
                  <Link to="/bookshelf">
                    <button className="bookshelf-button" style={{marginTop:'-5px'}}>My Bookshelf</button>
                  </Link>
                  </div>
                </div>
                <div id="bookList" className="book-list">
                  {books.map((book, index) => (
                    <div key={index} className="book-card">
                      <div className="book-info">
              <div className="book-title">
                <strong className="label">Book Title:</strong>
                <span className="book-title-text">{book.title}</span>
              </div>
              <p><strong>Edition Count:</strong> {book.edition_count}</p>
              </div>
            {bookshelf.some(shelfBook => shelfBook.key === book.key) ? null : (
                        <button onClick={() => {
                          addToBookshelf(book);
                          // Hide the button after adding to bookshelf
                          setBooks(prevBooks => prevBooks.map((b, i) => 
                            i === index ? { ...b, hideButton: true } : b
                          ));
                        }}>Add to Bookshelf</button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;