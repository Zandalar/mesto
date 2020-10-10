import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = popupSelector.querySelector('.popup__button-confirm');
  }

  setSubmit(data) {
    this._handleSubmit = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => this._handleSubmit());
  }
}
