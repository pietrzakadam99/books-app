{
  'use strict';
  
  const select = {
    templateOf: {
      booksTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters',
    },
    book: {
      image: '.books-list .book__image',
      favorite: '.favorite .book-list',
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
  const filters = [];
  const booksContainer = document.querySelector(select.containerOf.booksList);
  const filteredBooks = document.querySelector(select.containerOf.form);

  function initActions(){
    
    booksContainer.addEventListener('dblclick', function(event){
      // zatrzymanie domyślnej akcji
      event.preventDefault(); 
      // zwraca referencje który jest najbliżej kliknięty 
      const bookCover = event.target.offsetParent;
      // pobranie atrybutu 
      const id = bookCover.getAttribute('data-id');

      if(!bookCover.classList.contains('favorite')){
        // dodanie identyfikatora do tablicy 
        favoriteBooks.push(id); 
        // dodanie klasy favorite 
        bookCover.classList.add('favorite');
      } 
      else {
        // usunięcie id z tablicy 
        favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
        bookCover.classList.remove('favorite');
      }
    });
  }
  initActions();

  filteredBooks.addEventListener('change', function(event){
    event.preventDefault();
    const clickedElem = event.target;
    if(clickedElem.type === 'checkbox'){
      if(clickedElem.checked){
        filters.push(clickedElem.value);
        console.log(filters);
      }else{
        const filterIndex = filters.indexOf(clickedElem.value);
        filters.splice(filterIndex, 1);
        console.log(filters);
      }
    }
    filterBooks();
  });

  function filterBooks(){
    for(let elem of dataSource.books){
      let shouldBeHidden = false;
      for (let filter of filters){
        if(!elem.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        console.log('bookCover:', bookCover);
        bookCover.classList.add('hidden');
      }
      else{
        const bookCover = document.querySelector('.book__image[data-id="' + elem.id + '"]');
        bookCover.classList.remove('hidden');
      }
    }

  }



}
