export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.removeEventListener('mousedown', this._handleOverlayClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  disableSubmitButton() {
    this._popupSelector.querySelector('.popup__button-save').setAttribute('disabled', 'disabled');
    this._popupSelector.querySelector('.popup__button-save').classList.add('popup__button-save_disabled');
  }

  setEventListeners() {
    this._popupSelector.querySelector('.popup__button-close').addEventListener('click', this.close.bind(this));
  }
}

