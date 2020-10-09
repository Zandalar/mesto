// import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/Api.js";
import { popupArray } from "../utils/constants.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
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
const profileName = document.querySelector('.profile__info_name');
const profileDescription = document.querySelector('.profile__info_about');
const inputProfileName = document.querySelector('#profile__name');
const inputProfileDescription = document.querySelector('#profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
//Buttons
const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');
// Classes exemplars
const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);
const imagePopup = new PopupWithImage(imageContainer);
const profilePopup = new PopupWithForm(profileContainer, reloadUserInfo);
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);
const deletePopup = new PopupWithSubmit(deleteContainer);


const userId = "24aabab28d929d439424af4b";
let cardsList;

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "41df799d-3987-4f60-8d34-e2c5aaa920c0",
    "Content-Type": "application/json",
  },
})

function reloadUserInfo(data) {
  api
    .setUserInfo(data)
    .then((res) => setProfile(res))
    .catch((err) => console.log(`Ошибка: ${err}`))
}

function setProfile(profileData) {
  userInfo.setUserInfo(profileData);
  profilePopup.close();
}

function fillProfileInputs() {
  const profileData = userInfo.getUserInfo();
  inputProfileName.value = profileData.name;
  inputProfileDescription.value = profileData.about;
}

editButton.addEventListener('click', () => {
  profilePopup.open();
  profileValidator.checkInputValidity();
  fillProfileInputs();
});

api.getUserInfo();



function loadInitialCards() {
  api
    .getInitialCards()
    .then((initialCards) => renderInitialCards(initialCards))
    .catch((err) => console.log(`Ошибка: ${err}`));
}

function renderInitialCards(initialCards) {
  cardsList = new Section(
    {
      data: initialCards,
      renderer: renderNewCard
    },
    cardsContainer
  )
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
    deletePopup.setFormSubmitHandler(() => {
      api
        .deleteCard(data._id)
        .then(() => {
          card.delCard();
          deletePopup.close();
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
    })
  }

  function addLike(cardId) {
    api
      .addLike(cardId)
      .then(() => {
        console.log('like Like LIKE!!!!!')
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function removeLike(cardId) {
    api
      .deleteLike(cardId)
      .then(() => {
        console.log('It is a piece of sh1t!')
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
}

loadInitialCards();


const cardPopup = new PopupWithForm(placeContainer, (item) => {
  api
    .setNewCard(item)
    .then((item) => {
      renderNewCard(item)
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  cardPopup.close();
});


const avatarPopup = new PopupWithForm(avatarContainer, (item) => {
    api
      .editAvatar(item)
      .then((item) => setProfile(item))
      .catch((err) => console.log(`Ошибка: ${err}`));
})
avatarPopup.setEventListeners();





addCardButton.addEventListener('click', () => {
  cardPopup.open();
  cardsValidator.checkInputValidity();
});


imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
deletePopup.setEventListeners();

profileValidator.enableValidation();
cardsValidator.enableValidation();
