export default class Card {
  constructor(data, selector, userId, handleCardClick, handleDeleteIconClick, addLike, removeLike) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    return this._selector.content.cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.element__photo');
    this._title = this._element.querySelector('.element__title');
    this._likesCount = this._element.querySelector('.element__like-count');
    this._card = this._element.querySelector('.element');
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._title.textContent = this._name;
    this._likesCount.textContent = this._likes.length;
    this._showDeleteButton();
    this._showLikeButton();
    this._setEventListeners();
    return this._element;
  }

  _showDeleteButton() {
    this._deleteButton = this._element.querySelector('.element__button-delete');
      if (this._ownerId === this._userId) {
        this._deleteButton.classList.add('element__button-delete_active');
      }
  }

  _showLikeButton() {
    this._likeButton = this._element.querySelector('.element__button-like');
      if (this._likes.some((item) => item._id === this._userId)) {
        this._likeButton.classList.add('element__button-like_active');
      }
  }

  _handleLikeClick(evt) {
    if (evt.target.classList.contains('element__button-like_active')) {
      evt.target.classList.remove('element__button-like_active');
      this._likesCount.textContent = this._likes.length -= 1;
      this._removeLike(this._cardId);
    } else {
      evt.target.classList.add('element__button-like_active')
      this._likesCount.textContent = this._likes.length += 1;
      this._addLike(this._cardId);
    }
  }

  removeCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', (evt) => {
        this._handleLikeClick(evt);
      });
    this._element
      .querySelector('.element__button-delete')
      .addEventListener('click', () => {
        this._handleDeleteIconClick();
      });
    this._element
      .querySelector('.element__photo')
      .addEventListener('click', () => {
        this._handleCardClick();
      })
  }
}
