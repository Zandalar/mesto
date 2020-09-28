export const initialCards = [
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

export const popupArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

export const profileForm = document.querySelector('#profile__form');
export const placeForm = document.querySelector('#place__form');
export const profileContainer = document.querySelector('#popup__profile');
export const placeContainer = document.querySelector('#popup__place');
export const cardsContainer = document.querySelector('.element__table');
export const imageContainer = document.querySelector('#popup__image');

export const profileName = document.querySelector('.profile__info_name');
export const profileDescription = document.querySelector('.profile__info_about');
export const inputProfileName = document.querySelector('#profile__name');
export const inputProfileDescription = document.querySelector('#profile__description');
export const inputPlaceName = document.querySelector('#place__name');
export const inputPlaceLink = document.querySelector('#place__link');

export const editButton = document.querySelector('.profile__info_button-edit');
export const addCardButton = document.querySelector('.profile__button-add');
