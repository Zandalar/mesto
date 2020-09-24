export default class Card {
  constructor(arr, selector, handleCardClick) {
    this._arr = arr;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__photo').src = this._arr.link;
    this._element.querySelector('.element__photo').alt = this._arr.name;
    this._element.querySelector('.element__title').textContent = this._arr.name;
    this._setEventListeners();
    return this._element;
  }

  _addLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.element').remove();
  }

  _renderBigPhoto() {
    const imageData = {};
    imageData.src = this._element.querySelector('.element__photo').src;
    imageData.textContent = this._element.querySelector('.element__title').textContent;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', (evt) => {
        this._addLike(evt);
      });
    this._element
      .querySelector('.element__button-delete')
      .addEventListener('click', (evt) => {
        this._deleteCard(evt);
      });
    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        this._renderBigPhoto(this._element);
        this._handleCardClick(this._arr);
      });
  }
}
