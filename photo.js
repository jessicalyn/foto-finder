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

  }

  updatePhoto() {

  }
}