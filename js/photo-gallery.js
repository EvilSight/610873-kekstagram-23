import { renderPictures } from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';
import { createPhotoDescriptionList } from './data.js';

const getShowPhotoСlosure = (photoDescription) => () => showPhoto(photoDescription);

const addThumbnailClickHandler = (thumbnail, photoDescription) => {
  thumbnail.addEventListener('click', getShowPhotoСlosure(photoDescription));
};

const createPhotoGallery = (createPhotoDescriptionList) => {
  if (photoDescriptionList && photoDescriptionList.length > 0) {
    renderPictures(photoDescriptionList);

    const thumbnails = document.querySelectorAll('.picture__img');
    for (let i = 0; i < thumbnails.length; i++) {
      addThumbnailClickHandler(thumbnails[i], photoDescriptionList[i]);
    }
  }
};

export {createPhotoGallery};
