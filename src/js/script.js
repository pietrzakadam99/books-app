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
      // referencja do formularza filters 
      thisBooksList.filtersWrapper = document.querySelector(select.containerOf.filters);
    
      // tu dodanie id książek, które dodano do ulubionych 
      thisBooksList.favoriteBooks = [];
      // tu jakie aktualnie filtry są wybrane 
      thisBooksList.filters = [];
    }
  
    render(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
      
        // stałą równa temu co zwraca funkcja 
        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        // ustala długośc paska (np 5 to 50%)
        const ratingWidth = book.rating * 10;
        // generowanie HTML na podstawie szablonu 
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
        // dołączenie jako nowe dziecko DOM do listy books 
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
          // pobranie id książki 
          const id = bookCover.getAttribute('data-id');

          // sprawdzenie czy favoriteBook ma id zapisane w data-id, jeżeli nie dodać klasę 
          if (!bookCover.classList.contains(classNames.favoriteBook)){
            thisBooksList.favoriteBooks.push(id);
            // dodanie klasy favorite 
            bookCover.classList.add(classNames.favoriteBook);
          }
          else {
            // 
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(id), 1);
            bookCover.classList.remove(classNames.favoriteBook);
          }
        }
      });

      thisBooksList.filtersWrapper.addEventListener('change', function(event){
        event.preventDefault();

        const clickedElem = event.target;

        // sprawdzenie czy kliknięto na element 
        if(clickedElem.name === 'filter'){
          // sprawdzenie czy input jest zaznaczony (checked zwraca true jeżeli zaznaczony a false jeśli nie)
          if(clickedElem.checked){
            // jeżeli jest to dodać wartość filtra do tablicy 
            thisBooksList.filters.push(clickedElem.value);
          }
          else { 
            // jeżeli jest odznaczony to usunąć z tablicy 
            const filterIndex = thisBooksList.filters.indexOf(clickedElem.value);
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(filterIndex), 1);
          }
        }
        // wywoływana za każdym razem przy zmianie checkboxa 
        thisBooksList.filterBooks();
      });
    }

    filterBooks(){
      const thisBooksList = this;

      // przejście po wszystkich elementach (książkach)
      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
        // przejście po tablicy filters
        for (let filter of thisBooksList.filters){
          // sprawdzenie filtra (jeżeli nie jest) np detail.adults = true
          if(!book.details[filter]){
            shouldBeHidden = true;
            // przerwanie działania pętli 
            break;
          }
        }
        // znalezienie elementu 
        const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');
        // sprawdzenie wartości 
        if(shouldBeHidden){
          // jeżeli true to znaleźć element book__image i nadać klasę hidden
          bookCover.classList.add('hidden');
        }
        else{
          // jeżeli false to zabrać klasę 
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
