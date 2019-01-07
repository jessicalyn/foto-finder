var addToAlbum = document.getElementById('add-to-album');
var inputPhoto = document.getElementById('choose-file');
var photoGallery = document.querySelector('.foto-library');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();
var title = document.querySelector('.input-title');
var caption = document.querySelector('.input-caption');
var deleteBtn = document.getElementById('delete-btn');
var library = document.querySelector('.foto-library');

window.addEventListener('load', appendPhotos(imagesArr));
addToAlbum.addEventListener('click', createElement);
library.addEventListener('click', deleteCard);

function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (photo) {
    var newPhoto = new Photo(photo.id, photo.title, photo.file, photo.caption, photo.favorite);
    imagesArr.push(newPhoto);
    displayPhotoCard(newPhoto);
  })
  console.log(imagesArr);
}

function createElement() {
  if (inputPhoto.files[0]) {
    reader.readAsDataURL(inputPhoto.files[0]); 
    reader.onload = addPhoto;
  }
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), title.value, e.target.result, caption.value);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  displayPhotoCard(newPhoto.id, newPhoto.title, newPhoto.file, newPhoto.caption);
  title.value = '';
  caption.value = '';
}

function displayPhotoCard(card) {
  console.log("displayPhotoCard");
  photoGallery.innerHTML += 
  `<article class="foto-card" data-id="${card.id}">
      <section>
        <h2 class="input-fields foto-title" id="h2-edit" contenteditable="true">${card.title}</h2>
      </section>
      <section class="foto-image">
        <img src=${card.file} />
      </section>
      <section class="input-fields foto-caption" contenteditable="true">
        <p>${card.caption}</p>
      </section>
      <section class="foto-icons">
        <input class="card-btns" id="delete-btn" type="image" src="images/delete.svg">
        <input class="card-btns" id="favorite-btn" type="image" src="images/favorite.svg">
      </section>
    </article>`
}

function deleteCard(event) {
  console.log("clicked delete");
  if (event.target.classList.contains('delete-btn')){
    var indexToDelete = arrayCards.findIndex(function(idea) {
      return idea.id === parseInt(event.target.id)
    })
    arrayCards[indexToDelete].deleteFromStorage(arrayCards, indexToDelete);
    event.target.closest('.ideas__container').remove();
  }
}

function manipulateCard(event) {
  if (event.target.classList.contains('btn--kill')){
    deleteCard(event);
  } else if (event.target.classList.contains('btn--dwn')) {
    changeQuality(event);
  } else if (event.target.classList.contains('btn--up')) {
    changeQuality(event);
  }
}