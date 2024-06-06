import React from 'react';
import './App.css'; // Ensure the CSS file is imported

const Bookshelf = ({ bookshelf }) => {
  return (
    <div className="container">
      <h1 className="header">My Bookshelf</h1>

      <div id="bookList" className="book-list">
        {bookshelf.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-info">
              <div className="book-title">
                <strong>Book Title:</strong> <span className="book-title-text">{book.title}</span>
              </div>
              <p><strong>Edition Count:</strong> {book.edition_count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
