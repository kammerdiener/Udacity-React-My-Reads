import React, { Component } from 'react';
import {search, get} from './BooksAPI';
import Book from './Book';
import {Link} from 'react-router-dom';

class SearchBooks extends Component{
  state = {
    bookResults: [],
    query: ''
  };

  updateQuery = (event) => {
    this.setState({query: event.target.value});
    search(event.target.value, 10)
      .then((data) => {
        let newBookResultsState;
        data ? (data.error ? newBookResultsState = [] : newBookResultsState = data) : newBookResultsState = [];
        this.setState({ bookResults: newBookResultsState })
      });
  };


  render() {
    return(
      <div>
        <div className="search-books-bar">
          <Link to="/" className="close-search"/>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search Books"
                   value={this.state.query}
                   onChange={this.updateQuery}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.bookResults.map((book) => (
              <Book getAllBooks={this.props.getAllBooks} key={book.id} book={book}/>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBooks;