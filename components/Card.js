export default class Card {
  constructor(arr, selector, { handleCardClick }) {
    this._name = arr.name;
    this._link = arr.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__photo").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _addLike() {
    this._element.querySelector(".element__button-like").classList.toggle("element__button-like_active");
  }

  _deleteCard() {
    const delButton = this._element.querySelector('.element__button-delete');
    delButton.closest(".element").remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button-like")
      .addEventListener('click', () => {
        this._addLike();
      });
    this._element
      .querySelector(".element__button-delete")
      .addEventListener('click', () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".element__photo")
      .addEventListener('click', () => {
        this._handleCardClick();
      });
  }
}
