import React, { Component } from 'react';
import { update, get } from './BooksAPI';
class Book extends Component {
  bookCoverSpecs = {
    width: 128,
    height: 193
  };

  state = {
    book: this.props.book
  };

  options = [
    {
      title: 'Move to...',
      value: 'moveto',
      disabled: true
    },
    {
      title: 'Currently Reading',
      value: 'currentlyReading',
      disabled: false
    },
    {
      title: 'Want to Read',
      value: 'wantToRead',
      disabled: false
    },
    {
      title: 'Read',
      value: 'read',
      disabled: false
    },
    {
      title: 'none',
      value: 'none',
      disabled: false
    },
  ];

  componentDidMount() {
    get(this.state.book.id).then(book => this.setState({
      book
    }));
    console.log(this.state);
  }

  createBackgroundImageString(url) {
    return `url("${url}")`
  }

  createBookCoverStyle(book, width, height) {
    let style = { width, height,};
    if (book.imageLinks) {
      if (book.imageLinks.smallThumbnail) {
        style.backgroundImage = this.createBackgroundImageString(book.imageLinks.smallThumbnail)
      }
    }
    return style;
  }

  getBookshelf(book) {
    return book.shelf ? book.shelf : 'none';
  }

  updateBook = (event) => {
    update(this.state.book, event.target.value)
      .then(() => {
        this.props.getAllBooks()
      });
  };

  render() {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.createBookCoverStyle(this.state.book,
            this.bookCoverSpecs.width, this.bookCoverSpecs.height)}></div>
          <div className="book-shelf-changer">`
            <select onChange={this.updateBook} value={this.getBookshelf(this.state.book)}>
              {this.options.map((option) => {
                if (option.disabled) {
                  return (<option key={option.value} value={option.value} disabled>{option.title}</option>)
                } else {
                  return (<option key={option.value} value={option.value}>{option.title}</option>)
                }
              })
              }
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(", ") : ''}</div>
      </div>
    );
  }
}
export default Book;