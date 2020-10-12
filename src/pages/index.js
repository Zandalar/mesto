import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import { loader } from '../utils/utils.js';
import { popupArray, profileContainer, placeContainer, cardsContainer, imageContainer, templateContainer,
  deleteContainer, avatarContainer, profileForm, placeForm, avatarForm, profileName, profileDescription,
  inputProfileName, inputProfileDescription, profileAvatar, editButton, addCardButton, editAvatarButton,
  submitProfileButton, submitPlaceButton, submitAvatarButton, submitDeleteButton }
  from '../utils/constants.js';
// Classes exemplars
const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);
const avatarValidator = new FormValidator(popupArray, avatarForm);
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);
const imagePopup = new PopupWithImage(imageContainer);
const deletePopup = new PopupWithSubmit(deleteContainer);
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '41df799d-3987-4f60-8d34-e2c5aaa920c0',
    'Content-Type': 'application/json',
  }
})
// Other
const userId = '24aabab28d929d439424af4b';
let cardsList;
// Profile's functions
function fillProfileInputs() {
  const profileData = userInfo.getUserInfo();
  inputProfileName.value = profileData.name;
  inputProfileDescription.value = profileData.about;
}

function setProfile(data) {
  userInfo.setUserInfo(data);
  profilePopup.close();
}

function loadInitialProfile() {
  api
    .getUserInfo()
    .then((data) => {
      userInfo.setUserInfo(data)
    })
}
// Cards functions
function handleCardClick(data) {
  imagePopup.open(data);
}

function handleDeleteIconClick(data) {
  deletePopup.open();
  deletePopup.setSubmit(() => {
    loader(true, submitDeleteButton, 'Да');
    api
      .deleteCard(data._id)
      .then(() => {
        document.getElementById(data._id).remove();
        deletePopup.close();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
      .finally(() => loader(false, submitDeleteButton, 'Да'))
  })
}

function addLike(data) {
  api
    .addLike(data)
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
}

function removeLike(data) {
  api
    .deleteLike(data)
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
}

function createCard(data) {
  const card = new Card(
    data,
    templateContainer,
    userId,
    addLike,
    removeLike,
    () => handleCardClick(data),
    () => handleDeleteIconClick(data),
  )
  return card.generateCard();
}

function renderNewCard(data) {
  cardsList.addItem(createCard(data));
}

function renderInitialCards(data) {
  cardsList = new Section({ data: data, renderer: renderNewCard }, cardsContainer);
  cardsList.renderItems();
}

function loadInitialCards() {
  api
    .getInitialCards()
    .then((res) => renderInitialCards(res))
    .catch((err) => console.log(`Что-то пошло не так: ${err}`))
}
// Form for new place
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
const cardPopup = new PopupWithForm(placeContainer, addCardToList);
// Form for new avatar
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
const avatarPopup = new PopupWithForm(avatarContainer, addAvatar);
// Form for new user info
function loadUserInfo(data) {
  loader(true, submitProfileButton, 'Сохранить');
  api
    .setUserInfo(data)
    .then((res) => setProfile(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => loader(false, submitProfileButton, 'Сохранить'))
}
const profilePopup = new PopupWithForm(profileContainer, loadUserInfo);
// Listeners and other
editAvatarButton.addEventListener('click', () => {
  avatarPopup.open();
  avatarValidator.checkInputValidity();
})
addCardButton.addEventListener('click', () => {
  cardPopup.open();
  cardsValidator.checkInputValidity();
})
editButton.addEventListener('click', () => {
  profilePopup.open();
  profileValidator.checkInputValidity();
  fillProfileInputs();
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
loadInitialProfile();
