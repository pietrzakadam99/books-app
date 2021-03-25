{
  'use strict';
  
  const select = {
    booksTemplate: '#template-book',
    booksList: '.books-list',
    form: '.filters',
    image: '.book__image',
    favorite: '.favorite',
    hidden: 'hidden',
  };
    
  const templates = {
    booksTemplate: Handlebars.compile(document.querySelector(select.booksTemplate).innerHTML),
  };
  
  class BooksList{
    constructor(){
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.booksContainer = document.querySelector(select.booksList);
      thisBooksList.filteredBooks = document.querySelector(select.form);
    
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }
  
    render(){
      const thisBooksList = this;

      for(let books of thisBooksList.data){
      
        books.ratingBgc = thisBooksList.determineRatingBgc(books.rating);
        books.ratingWidth = books.rating * 10;
      
      
        // wygenerowanie kodu HTML na podstawie szablonu oraz danych książki
        const generatedHTML = templates.booksTemplate(books);
        // wygenerowanie elementu DOM na podstawie HTML
        const element = utils.createDOMFromHTML(generatedHTML);
        // znaleźć kontener
        const booksContainer = document.querySelector(select.booksList);
        // dodać element 
        booksContainer.appendChild(element);
      }
    }

    initActions(){
      const thisBooksList = this;
    
      thisBooksList.booksContainer.addEventListener('dblclick', function(event){
      // zatrzymanie domyślnej akcji
        event.preventDefault(); 
        // zwraca referencje który jest najbliżej kliknięty 
        const bookCover = event.target.offsetParent;
        // pobranie atrybutu
        if(!bookCover.classList.contains('favorite')){ 
          const id = bookCover.getAttribute('data-id');

      
          if (bookCover.includes(id)){
            const indexBooks = bookCover.indexOf(id);
            bookCover.classList.remove('favorite');
            thisBooksList.favoriteBooks.splice(indexBooks, 1);
          }else{
            bookCover.classList.add('favorite');
            bookCover.push(id);
          }
        }
      });
      thisBooksList.filteredBooks.addEventListener('change', function(event){
        event.preventDefault();

        const clickedElem = event.target;

        if(clickedElem.type === 'checkbox'){
          if(clickedElem.checked){
            thisBooksList.filters.push(clickedElem.value);
          }else{
            const filterIndex = thisBooksList.filters.indexOf(clickedElem.value);
            thisBooksList.filters.splice(filterIndex, 1);
          }
        }
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
        for (let filter of thisBooksList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden){
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          console.log('bookCover:', bookCover);
          bookCover.classList.add('hidden');
        }
        else{
          const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
          bookCover.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      let background = '';

      if(rating<6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }else if(rating >6 && rating<=8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }else if(rating>8 && rating<=9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }else if(rating>9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }
  

  const app = new BooksList();
  app();
}
