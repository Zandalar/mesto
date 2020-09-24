import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { popupArray, initialCards, profileForm, placeForm, profileContainer, placeContainer,
  cardsContainer, imageContainer, profileName, profileDescription, inputProfileName,
  inputProfileDescription, editButton, addCardButton} from '../utils/constants.js';

const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);
const cardsList = new Section({ data: initialCards, renderer: renderItems }, cardsContainer);
const imagePopup = new PopupWithImage(imageContainer);
const cardPopup = new PopupWithForm(placeContainer, renderNewCard);
const profilePopup = new PopupWithForm(profileContainer, fillProfileForm);
const userInfo = new UserInfo({ name: profileName, description: profileDescription });


function renderItems(data) {
  const handleCardClick = (imageData) => {
    imagePopup.open(imageData)
  }
  const card = new Card(data, '#templateContainer', handleCardClick);
  cardsList.addItem(card.generateCard());
}

function fillProfileForm(data) {
  userInfo.setUserInfo(data.name, data.description);
  profilePopup.close();
}

function renderNewCard(data) {
  renderItems(data);
  cardPopup.close();
}

editButton.addEventListener('click', () => {
  const infoList = userInfo.getUserInfo();

  profilePopup.open();
  inputProfileName.value = infoList.name;
  inputProfileDescription.value = infoList.description;
  profileValidator.enableValidation();
})

addCardButton.addEventListener('click', () => {
  cardPopup.open();
  cardsValidator.enableValidation();
})

imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
cardsList.renderItems();
