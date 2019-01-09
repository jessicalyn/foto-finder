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

  updatePhoto(category, text) {
    console.log(category, text);
    if (event.target.classList.contains("favorite-btn")) {
      this.favorite = !this.favorite;
      this.saveToStorage(imagesArr);
    }
    if (category === "title") {
      this.title = text;
    }
    if (category === "caption") {
      this.caption = text;
    }
    this.saveToStorage(imagesArr);
  }
}