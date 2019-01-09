class Photo {
  constructor(id, title, file, caption, favorite) {
    this.id = id;
    this.title = title;
    this.file = file;
    this.caption = caption;
    this.favorite = favorite || false;
  }

  saveToStorage(imagesArr) {
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  deleteFromStorage() {
    var index = imagesArr.findIndex(function(photo) {
      return photo.id === index;
    });
    imagesArr.splice(index, 1)
    this.saveToStorage(imagesArr);
  }

  updatePhoto() {
    if (event.target.classList.contains("favorite-btn")) {
      this.favorite = !this.favorite;
    this.saveToStorage(imagesArr);
    }
  }
}