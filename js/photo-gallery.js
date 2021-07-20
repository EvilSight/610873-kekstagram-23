import { renderPictures } from './thumbnails-viewer.js';
import {showPhoto} from './photo-viewer.js';
import { createPhotoDescriptionList } from './data.js';

const createPhotoGallery = (createPhotoDescriptionList) => {
  if (photoDescriptionList && photoDescriptionList.length > 0) {
    showPhoto(photoDescriptionList[0]);
    renderPictures(photoDescriptionList);
  }
};

export {createPhotoGallery};
