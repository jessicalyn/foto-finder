var addToAlbum = document.getElementById('add-to-album');
var inputPhoto = document.getElementById('choose-file');
var photoGallery = document.querySelector('.foto-library');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();
var title = document.querySelector('.input-title');
var caption = document.querySelector('.input-caption');

window.addEventListener('load', appendPhotos);
addToAlbum.addEventListener('click', createElement);

function appendPhotos() {
  console.log("appendPhotos method");
  imagesArr.forEach(function (photo) {
    displayPhotoCard(photo.title, photo.file, photo.caption);
  })
}

function createElement() {
  console.log(inputPhoto.files[0])
  if (inputPhoto.files[0]) {
    reader.readAsDataURL(inputPhoto.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), e.target.result, title.value, caption.value);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  displayPhotoCard(newPhoto.title, newPhoto.file, newPhoto.caption);
}

function displayPhotoCard(title, file, caption) {
  console.log("displayPhotoCard");
  photoGallery.innerHTML += 
  `<article class="foto-card">
      <section class="foto-title">
        <h2>${title}</h2>
      </section>
      <section class="foto-image">
        <img src=${file} />
      </section>
      <section class="foto-caption">
        <p>${caption}</p>
      </section>
      <section class="foto-icons">
        <button><img src="images/delete.svg"></button>
        <button><img src="images/favorite.svg"></button>
      </section>
    </article>`
}

