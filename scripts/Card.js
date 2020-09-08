const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

class Card {
  constructor(arr, selector) {
    this._name = arr.name;
    this._link = arr.link;
    this._selector = selector;

    _getTemplate() {
      const cardElement = document
        .querySelector(this._selector)
        .content
        .cloneNode(true);

      return cardElement;
    }

    makeCard() {
      this._element = this._getTemplate();

      this._element.querySelector('.element__photo').src = this._link;
      this._element.querySelector('.element__photo').alt = this._name;
      this._element.querySelector('.card__paragraph').textContent = this._name;

      return this._element;
    }
  }
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.makeCard();
  const cardsContainer = document.querySelector('.element__table');

  cardsContainer.append(cardElement);
});
