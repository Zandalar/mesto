import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ photoName, photoLink }) {
    super.open();
    this._popupSelector.querySelector('.popup__image').src = photoLink;
    this._popupSelector.querySelector('.popup__image').alt = photoName;
    this._popupSelector.querySelector('.popup__title_image').textContent = photoName;
  }
}
