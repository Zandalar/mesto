export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return this._selector.content.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.element__photo');
    this._title = this._element.querySelector('.element__title');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._title.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _addLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }

  _deleteCard(evt) {
    evt.target.closest('.element').remove();
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
        this._handleCardClick(this._name, this._link);
      })
  }
}
