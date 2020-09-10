import { popupArray, initialCards } from "../utils/constants.js";
import { Card } from "./Card.js";
import { FormValidator, checkPopupValidity } from "./FormValidator.js";

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

const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);

export function openPopup(container) {
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

  closeButtonList.forEach((btn) => {
    btn.addEventListener ('click', (evt) => {
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

function renderCards(arr) {
  const newCard = new Card(arr, "#templateContainer");
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
initialCards.forEach((item) => {
  renderCards(item);
})
setCloseButtons();
profileValidator.enableValidation();
cardsValidator.enableValidation();



