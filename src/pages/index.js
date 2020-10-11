import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { popupArray } from '../utils/constants.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
//Containers
const profileContainer = document.querySelector('#popup__profile');
const placeContainer = document.querySelector('#popup__place');
const cardsContainer = document.querySelector('.element__table');
const imageContainer = document.querySelector('#popup__image');
const templateContainer = document.querySelector('#templateContainer');
const deleteContainer = document.querySelector('#popup__deletion');
const avatarContainer = document.querySelector('#popup__avatar')
//Forms, inputs
const profileForm = document.querySelector('#profile__form');
const placeForm = document.querySelector('#place__form');
const avatarForm = document.querySelector('#avatar__form');
const profileName = document.querySelector('.profile__info_name');
const profileDescription = document.querySelector('.profile__info_about');
const inputProfileName = document.querySelector('#profile__name');
const inputProfileDescription = document.querySelector('#profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
//Buttons
const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');
const editAvatarButton = document.querySelector('.profile__button-avatar');
const submitProfileButton = document.querySelector('#profile__button-save');
const submitPlaceButton = document.querySelector('#place__button-save');
const submitAvatarButton = document.querySelector('#avatar__button-save');
const submitDeleteButton = document.querySelector('#deletion__button-confirm');
// Classes exemplars
const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);
const avatarValidator = new FormValidator(popupArray, avatarForm);
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);
const profilePopup = new PopupWithForm(profileContainer, loadUserInfo);
const cardPopup = new PopupWithForm(placeContainer, addCardToList);
const avatarPopup = new PopupWithForm(avatarContainer, addAvatar);
const imagePopup = new PopupWithImage(imageContainer);
const deletePopup = new PopupWithSubmit(deleteContainer);
// Other
const userId = "24aabab28d929d439424af4b";
let cardsList;
// Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "41df799d-3987-4f60-8d34-e2c5aaa920c0",
    "Content-Type": "application/json",
  },
})
// Profile's functions
function loadUserInfo(data) {
  loader(true, submitProfileButton, 'Сохранить');
  api
    .setUserInfo(data)
    .then((res) => setProfile(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => loader(false, submitProfileButton, 'Сохранить'))
}

function fillProfileInputs() {
  const profileData = userInfo.getUserInfo();
  inputProfileName.value = profileData.name;
  inputProfileDescription.value = profileData.about;
}

function setProfile(data) {
  userInfo.setUserInfo(data);
  profilePopup.close();
}
// Forms functions
function addCardToList(data) {
  loader(true, submitPlaceButton, 'Создать');
  api
    .setNewCard(data)
    .then((data) => {
      renderNewCard(data);
      cardPopup.close();
    })
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => loader(false, submitPlaceButton, 'Создать'))
}

function addAvatar(data) {
  loader(true, submitAvatarButton, 'Сохранить');
  api
    .editAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      avatarPopup.close();
    })
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
    .finally(() => loader(false, submitAvatarButton, 'Сохранить'))
}
// Cards functions
function loadInitialCards() {
  api
    .getInitialCards()
    .then((res) => renderInitialCards(res))
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
}

function renderInitialCards(data) {
  cardsList = new Section({ data: data, renderer: renderNewCard }, cardsContainer);
  cardsList.renderItems();
}

function renderNewCard(data) {
  const card = new Card(data, templateContainer, userId, handleCardClick, handleDeleteIconClick, addLike, removeLike);
  cardsList.addItem(card.generateCard());

  function handleCardClick() {
    imagePopup.open(data);
  }

  function handleDeleteIconClick() {
    deletePopup.open();
    deletePopup.setSubmit(() => {
      loader(true, submitDeleteButton, 'Да');
      api
        .deleteCard(data._id)
        .then(() => {
          card.removeCard();
          deletePopup.close();
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`))
        .finally(() => loader(false, submitDeleteButton, 'Да'))
    })
  }

  function addLike(cardId) {
    api
      .addLike(cardId)
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }

  function removeLike(cardId) {
    api
      .deleteLike(cardId)
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }
}
// Loader
function loader(isLoading, button, text) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = text;
  }
}
// Listeners and other
editAvatarButton.addEventListener('click', () => {
  avatarPopup.open();
  avatarValidator.checkInputValidity();
  avatarPopup.disableSubmitButton();
})
addCardButton.addEventListener('click', () => {
  cardPopup.open();
  cardsValidator.checkInputValidity();
  cardPopup.disableSubmitButton();
})
editButton.addEventListener('click', () => {
  profilePopup.open();
  profileValidator.checkInputValidity();
  fillProfileInputs();
  profilePopup.disableSubmitButton();
})
imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

profileValidator.enableValidation();
cardsValidator.enableValidation();
avatarValidator.enableValidation();

loadInitialCards();
api.getUserInfo();
