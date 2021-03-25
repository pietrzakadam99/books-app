{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      filters: '.filters'
    },
    book: {
      image: 'book__image',
    }
  };
  const classNames = {
    favoriteBook: 'favorite',
    hidden: 'hidden',
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };
  
  class BooksList{
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.listContainer = document.querySelector(select.containerOf.bookList);
      thisBooksList.filtersWrapper = document.querySelector(select.containerOf.filters);
    
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }
  
    render(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
      
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate({
          id: book.id,
          price: book.price,
          name: book.name,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth
        });
        const element = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.listContainer.appendChild(element);
      }
    }

    initActions(){
      const thisBooksList = this;
    
      thisBooksList.listContainer.addEventListener('dblclick', function(event){
      // zatrzymanie domyślnej akcji
        event.preventDefault(); 
        // zwraca referencje który jest najbliżej kliknięty 
        const bookCover = event.target.offsetParent;
        // pobranie atrybutu
        if(bookCover.classList.contains(select.book.image)){ 
          const id = bookCover.getAttribute('data-id');

      
          if (!bookCover.classList.contains(classNames.favoriteBook)){
            thisBooksList.favoriteBooks.push(id);
            bookCover.classList.add(classNames.favoriteBook);
          }
          else {
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(id), 1);
            bookCover.classList.remove(classNames.favoriteBook);
          }
        }
      });
      thisBooksList.filtersWrapper.addEventListener('change', function(event){
        event.preventDefault();

        const clickedElem = event.target;

        if(clickedElem.name === 'filter'){
          if(clickedElem.checked){
            thisBooksList.filters.push(clickedElem.value);
          }
          else { 
            const filterIndex = thisBooksList.filters.indexOf(clickedElem.value);
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(filterIndex), 1);
          }
        }
        thisBooksList.filterBooks();
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
        const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
        if(shouldBeHidden){
          // console.log('bookCover:', bookCover);
          bookCover.classList.add('hidden');
        }
        else{
          bookCover.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      let background = '';

      if(rating<6){
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if(rating >6 && rating<=8){
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if(rating>8 && rating<=9){
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if(rating>9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }
  

  const app = {
    initProject: function(){
      new BooksList();
    }
  };
  app.initProject();
}
