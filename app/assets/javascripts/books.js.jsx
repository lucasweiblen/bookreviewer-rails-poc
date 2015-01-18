/** @jsx React.DOM */
var Book = React.createClass({
  render: function() {
    return (
      <div className='book'>
        <h2>
          Name: {this.props.name}
          Pages: {this.props.pages}
          Language: {this.props.language}
        </h2>
      </div>
    );
  }
});

var BookList = React.createClass({
  render: function() {
    var books = this.props.books.map(function(book, index) {
      return (<Book name={book.name} pages={book.pages} language={book.language} key={index} />);
    });

    return (
      <div className='booksList'>
        {books}
      </div>
    );
  }
});

var BookForm = React.createClass({
  clearInputs: function() {
    this.refs.name.getDOMNode().value = '';
    this.refs.pages.getDOMNode().value = '';
    this.refs.language.getDOMNode().value = '';
  },
  handleSubmit: function() {
    var name = this.refs.name.getDOMNode().value.trim();
    var pages = parseInt(this.refs.pages.getDOMNode().value.trim(), 10);
    var language = this.refs.language.getDOMNode().value.trim();
    this.props.onNewBook({name: name, pages: pages, language: language});
    this.clearInputs();
    return false;
  },
  render: function() {
    return (
        <form className='bookForm' onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='book[name]'>Name:</label>
            <input type='text' name='book[name]' ref='name' />
          </div>
          <div>
            <label htmlFor='book[pages]'>Pages:</label>
            <input type='text' name='book[pages]' ref='pages' />
          </div>
          <div>
            <label htmlFor='book[language]'>Language:</label>
            <input type='text' name='book[description]' ref='language' />
          </div>
          <input type='submit' value='Add book' />
      </form>
    );
  }
});

var BooksBox = React.createClass({
  getInitialState: function() {
    return {
      books: []
    };
  },
  componentDidMount: function() {
    this.loadBooks();
  },
  loadBooks: function() {
    var books = [
      { name: "Teste", pages: "10", language: "English" },
      { name: "Dummies", pages: "90", language: "Deutsch" }
    ];

    this.setState({books: books});
  },
  handleNewBook: function(book) {
    console.log(book);
    var books = this.state.books;
    var newBooks = books.concat([book]);
    this.setState({books: newBooks});
  },
  render: function() {

    return (
      <div className='booksBox'>
        <BookForm onNewBook={this.handleNewBook}/>
        <BookList books={this.state.books}/>
      </div>
    );
  }
});

var ready = function() {
  React.renderComponent(
    <BooksBox/>, document.getElementById('books')
  );
};

$(document).ready(ready);
