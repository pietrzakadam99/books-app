{
  'use strict';
  
  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };
  
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksTemplate).innerHTML),
  };
  
  function render(){
    for(let book of dataSource.books){
      // wygenerowanie kodu HTML na podstawie szablonu oraz danych książki
      const generatedHTML = templates.booksTemplate(book);
      // wygenerowanie elementu DOM na podstawie HTML
      const element = utils.createDOMFromHTML(generatedHTML);
      // znaleźć kontener
      const booksContainer = document.querySelector(select.containerOf.booksList);
      // dodać element 
      booksContainer.appendChild(element);
    }
  }
  render();

  const favoriteBooks = [];

  function initActions(){

    const booksContainer = document.querySelector(select.containerOf.booksList);
    const booksImage = booksContainer.querySelectorAll('.book__image');

    for(let image of booksImage){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        image.classList.add('favorite'); // dodanie klasy favorite 
        const id = image.getAttribute('data-id'); // pobranie id książki 
        favoriteBooks.push(id); // dodanie id do favoriteBooks(tablicy)
      });
    }
  }
  initActions();





}
