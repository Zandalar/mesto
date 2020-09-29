import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { popupArray, initialCards } from "../utils/constants.js";
//Containers
const profileContainer = document.querySelector('#popup__profile');
const placeContainer = document.querySelector('#popup__place');
const cardsContainer = document.querySelector('.element__table');
const imageContainer = document.querySelector('#popup__image');
const templateContainer = document.querySelector('#templateContainer');
//Forms, inputs
const profileForm = document.querySelector('#profile__form');
const placeForm = document.querySelector('#place__form');
const profileName = document.querySelector('.profile__info_name');
const profileDescription = document.querySelector('.profile__info_about');
const inputProfileName = document.querySelector('#profile__name');
const inputProfileDescription = document.querySelector('#profile__description');
//Buttons
const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');
// Classes exemplars
const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);
const imagePopup = new PopupWithImage(imageContainer);
const cardPopup = new PopupWithForm(placeContainer, makeNewCard);
const profilePopup = new PopupWithForm(profileContainer, setProfile);
const userInfo = new UserInfo(profileName, profileDescription);
const cardsList = new Section({ data: initialCards, renderer: makeNewCard }, cardsContainer);

function makeNewCard(data) {
  const card = new Card(data, templateContainer, () => {
    imagePopup.open(data);
  })
  cardsList.addItem(card.generateCard());
  cardPopup.close();
}

function setProfile(profileData) {
  userInfo.setUserInfo(profileData);
  profilePopup.close();
}

function fillProfileInputs() {
  const profileData = userInfo.getUserInfo();
  inputProfileName.value = profileData.name;
  inputProfileDescription.value = profileData.description;
}

editButton.addEventListener('click', () => {
  profilePopup.open();
  fillProfileInputs();
  profileValidator.enableValidation();
});

addCardButton.addEventListener('click', () => {
  cardPopup.open();
  cardsValidator.enableValidation();
});

imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
cardsList.renderItems();
