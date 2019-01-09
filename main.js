var addToAlbum = document.getElementById('add-to-album');
var inputPhoto = document.getElementById('choose-file');
var photoGallery = document.querySelector('.foto-library');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();
var title = document.querySelector('.input-title');
var caption = document.querySelector('.input-caption');
var deleteBtn = document.getElementById('delete-btn');
var library = document.querySelector('.foto-library');
var searchInput = document.getElementById('search-input');

window.addEventListener('load', appendPhotos(imagesArr));
addToAlbum.addEventListener('click', createElement);
library.addEventListener('click', manipulateCard);
library.addEventListener('keydown', pressEnter);
searchInput.addEventListener('input', search);

function addPhoto(e) {
  var newPhoto = new Photo(Date.now(), title.value, e.target.result, caption.value);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  displayPhotoCard(newPhoto);
  title.value = '';
  caption.value = '';
}

function createElement() {
  if (inputPhoto.files[0]) {
    reader.readAsDataURL(inputPhoto.files[0]); 
    reader.onload = addPhoto;
  }
}

function displayPhotoCard(card) {
  photoGallery.innerHTML += 
  `<article class="foto-card" data-id="${card.id}">
      <section>
        <h2 class="foto-title h2-edit" contenteditable="true">${card.title}</h2>
      </section>
      <section class="foto-image">
        <img src=${card.file} />
      </section>
      <section class="foto-caption caption-edit" contenteditable="true">
        <p>${card.caption}</p>
      </section>
      <section class="foto-icons">
        <input class="card-btns delete-btn" type="image" src="images/delete.svg">
        <input class="card-btns favorite-btn" type="image" src=${card.favorite ? "images/favorite-active.svg" : "images/favorite.svg"}>
      </section>
    </article>`
}

function appendPhotos(array) {
  imagesArr = [];
  array.forEach(function (photo) {
    var photoCard = new Photo(photo.id, photo.title, photo.file, photo.caption, photo.favorite);
    imagesArr.push(photoCard);
    displayPhotoCard(photoCard);
  })
}

function pressEnter(event) {
  if(event.keyCode === 13) {
    captureContent(event);
  }
}

function captureContent(event) {
  event.preventDefault();
  var selectedCard = event.target.closest("article");
  var selectedCardId = parseInt(selectedCard.dataset.id);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === selectedCardId;
  });
  var targetClass = event.target.className;
  var targetText = event.target.innerText;
  editContent(index, targetClass, targetText);
}

function editContent(index, targetClass, targetText) {
  console.log(index, targetClass, targetText);
  if (targetClass === "foto-title h2-edit") {
    console.log("title if");
    imagesArr[index].updatePhoto("title", targetText);
  }
  if (targetClass === "foto-caption caption-edit") {
    imagesArr[index].updatePhoto("caption", targetText);
  }
}

function manipulateCard(event) {
  if (event.target.classList.contains("delete-btn")){
    deleteCard(event);
  } else if (event.target.classList.contains("favorite-btn")){
    isFavorite(event);
  }
}

function deleteCard(event) {
  var selectedCard = event.target.closest('article');
  var selectedCardId = parseInt(selectedCard.dataset.id);
  var index = imagesArr.findIndex(function(photo) {
      return photo.id === selectedCardId;
    });  
  imagesArr[index].deleteFromStorage();
  selectedCard.remove();
}
  
function isFavorite(event) {
  console.log("clicked favorite");
  var selectedCard = event.target.closest('article');
  var selectedCardId = parseInt(selectedCard.dataset.id);
  var foundCard = imagesArr.find(function(photo) {
      return photo.id === selectedCardId;
    });  
  if(foundCard.favorite === true) {
    event.target.src = "images/favorite.svg";
  } else {
    event.target.src = "images/favorite-active.svg";
  }
  foundCard.updatePhoto();
  foundCard.saveToStorage(imagesArr);
}

function search() {
  console.log(searchInput.value);
  photoGallery.innerHTML = "";
  var searchText = searchInput.value;
  var foundCards = imagesArr.filter(function(photo) {
    return photo.title.includes(searchText) || photo.caption.includes(searchText);
  });
  foundCards.forEach(function (photo) {
    var newPhoto = new Photo(photo.id, photo.title, photo.file, photo.caption, photo.favorite);
    displayPhotoCard(newPhoto);
  });
}