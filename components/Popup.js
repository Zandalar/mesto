export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popupSelector.addEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popupSelector.removeEventListener('mousedown', (evt) => this._handleOverlayClose(evt));
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

  setEventListeners() {
    this._popupSelector.querySelector(".popup__button-close").addEventListener('click', this.close.bind(this));
  }
}

