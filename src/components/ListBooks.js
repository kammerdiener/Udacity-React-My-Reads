import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Bookshelf from './BookShelf';
class ListBooks extends Component{
  render() {
    return (
      <div>
        <div className="list-books-title">
          <h1>My Reads Application</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf-books">
            {this.props.bookshelves.map(bookshelf => (<Bookshelf getAllBooks={this.props.getAllBooks} key={bookshelf.shelfType} bookshelfTitle={bookshelf.bookshelfTitle} shelfType={bookshelf.shelfType} books={this.props.books}/>))}
          </div>
          <div className="open-search">
            <Link to="/search"/>
          </div>
        </div>
      </div>
    )
  }
}
export default ListBooks;