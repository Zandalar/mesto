// import { popupArray, checkPopupValidity } from "./validate.js";
import { Card } from "./Card.js";
export { openPopup };
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

const profileForm = document.querySelector('#profile__form');
const placeForm = document.querySelector('#place__form');
const profileContainer = document.querySelector('#popup__profile');
const placeContainer = document.querySelector('#popup__place');
const cardsContainer = document.querySelector('.element__table');

const profileName = document.querySelector('.profile__info_name');
const profileDescription = document.querySelector('.profile__info_about');
const inputProfileName = document.querySelector('#profile__name');
const inputProfileDescription = document.querySelector('#profile__description');
const inputPlaceName = document.querySelector('#place__name');
const inputPlaceLink = document.querySelector('#place__link');

const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');

function openPopup(container) {
  container.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscape);
  container.addEventListener('mousedown', closeOnOverlay);
}

function closePopup(container) {
  container.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
  container.removeEventListener('mousedown', closeOnOverlay);
}

function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closeOnEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}

function setCloseButtons() {
  const closeButtonList = Array.from(document.querySelectorAll('.popup__button-close'));

  closeButtonList.forEach((closeButton) => {
    closeButton.addEventListener ('click', (evt) => {
      const popupContainer = evt.target.closest('.popup');
      closePopup(popupContainer);
    })
  })
}

function fillProfileForm() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(profileContainer);
}

function renderCards(array) {
  const newCard = new Card(array, "#templateContainer");
  cardsContainer.prepend(newCard.generateCard());
}

placeForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const cardElement = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  renderCards(cardElement);
  closePopup(placeContainer);
})

profileForm.addEventListener('submit', saveProfileForm);

editButton.addEventListener('click', () => {
  openPopup(profileContainer);
  checkPopupValidity(profileContainer, popupArray);
  fillProfileForm();
})

addCardButton.addEventListener('click', () => {
  openPopup(placeContainer);
  checkPopupValidity(placeContainer, popupArray);
})

setCloseButtons();

initialCards.forEach((item) => {
  renderCards(item);
})



