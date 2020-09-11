import { openBigPhoto } from "./index.js";

export class Card {
  constructor(arr, selector) {
    this._name = arr.name;
    this._link = arr.link;
    this._selector = selector;
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

  _addLike(evt) {
    evt.target.classList.toggle("element__button-like_active");
  }

  _deleteCard(evt) {
    evt.target.closest(".element").remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__button-like")
      .addEventListener("click", (evt) => {
        this._addLike(evt);
      });
    this._element
      .querySelector(".element__button-delete")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt);
      });
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", (evt) => {
        openBigPhoto(evt);
      });
  }
}
