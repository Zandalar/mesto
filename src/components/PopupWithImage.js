import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageLink = this._popupSelector.querySelector('.popup__image');
    this._imageTitle = this._popupSelector.querySelector('.popup__title_image');
  }

  open(data) {
    super.open();
    this._imageLink.src = data.link;
    this._imageLink.alt = data.name;
    this._imageTitle.textContent = data.name;
  }
}
