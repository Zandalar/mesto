import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
// import PopupWithForm from '../components/PopupWithForm.js';
// import UserInfo from '../components/UserInfo.js';

import { popupArray, initialCards } from '../utils/constants.js';


const profileForm = document.querySelector('#profile__form');
const placeForm = document.querySelector('#place__form');
const profileContainer = document.querySelector('#popup__profile');
const placeContainer = document.querySelector('#popup__place');
const cardsContainer = document.querySelector('.element__table');
const imagePopupContainer = document.querySelector('.popup__image');

const profileName = document.querySelector('.profile__info_name');
const profileDescription = document.querySelector('.profile__info_about');
const inputProfileName = document.querySelector('#profile__name');
const inputProfileDescription = document.querySelector('#profile__description');
const inputPlaceName = document.querySelector('#place__name');
const inputPlaceLink = document.querySelector('#place__link');
const imageTitle = document.querySelector('.popup__title_image');
const magePopup = document.querySelector('#popup__image');

const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');

const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);

const imagePopup = new PopupWithImage('#popup__image');
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    data: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, '#templateContainer', { handleCardClick: () => { imagePopup.open(cardItem.name, cardItem.link) }
      })
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardsContainer
);

cardsList.renderItems();


// export function openBigPhoto(evt) {
//   imagePopupContainer.src = evt.target.src;
//   imageTitle.textContent = evt.target
//     .closest('.element')
//     .querySelector('.element__title').textContent;
//   openPopup(imagePopup);
// }

// function setCloseButtons() {
//   const closeButtonList = Array.from(
//     document.querySelectorAll('.popup__button-close')
//   );
//
//   closeButtonList.forEach((btn) => {
//     btn.addEventListener('click', (evt) => {
//       const popupContainer = evt.target.closest('.popup');
//       closePopup(popupContainer);
//     });
//   });
// }

// function fillProfileForm() {
//   inputProfileName.value = profileName.textContent;
//   inputProfileDescription.value = profileDescription.textContent;
// }
//
// function saveProfileForm(evt) {
//   evt.preventDefault();
//   profileName.textContent = inputProfileName.value;
//   profileDescription.textContent = inputProfileDescription.value;
//   closePopup(profileContainer);
// }

// function renderCards(arr) {
//   const newCard = new Card(arr, '#templateContainer');
//   cardsContainer.prepend(newCard.generateCard());
// }

// placeForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   const cardElement = {
//     name: inputPlaceName.value,
//     link: inputPlaceLink.value,
//   };
//   renderCards(cardElement);
//   closePopup(placeContainer);
// });

// profileForm.addEventListener('submit', saveProfileForm);
//
// editButton.addEventListener('click', () => {
//   openPopup(profileContainer);
//   checkPopupValidity(profileContainer, popupArray);
//   fillProfileForm();
// });
//
// addCardButton.addEventListener('click', () => {
//   openPopup(placeContainer);
//   checkPopupValidity(placeContainer, popupArray);
// });

// initialCards.forEach((item) => {
//   renderCards(item);
// });

// setCloseButtons();
profileValidator.enableValidation();
cardsValidator.enableValidation();
