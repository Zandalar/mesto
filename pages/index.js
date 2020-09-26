import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { popupArray, initialCards, profileForm, placeForm, profileContainer, placeContainer,
  cardsContainer, imageContainer, profileName, profileDescription, editButton, addCardButton, inputPlaceName, inputPlaceLink} from '../utils/constants.js';

const profileValidator = new FormValidator(popupArray, profileForm);
const cardsValidator = new FormValidator(popupArray, placeForm);
const cardsList = new Section({ data: initialCards, renderer: renderNewCard }, cardsContainer);
const imagePopup = new PopupWithImage(imageContainer);
const cardPopup = new PopupWithForm(placeContainer, addNewCard);
const profilePopup = new PopupWithForm(profileContainer, fillProfileForm);
const userInfo = new UserInfo({ nameElement: profileName, descriptionElement: profileDescription });

function renderNewCard(data) {
  const card = new Card(data, '#templateContainer', openBigPhoto);
  cardsList.addItem(card.generateCard());
  cardPopup.close();
}

function addNewCard() {
  const card = new Card({
    name: inputPlaceName.value,
    link: inputPlaceLink.value
    },
    '#templateContainer',
    openBigPhoto);
  cardsList.addItem(card.generateCard());
  cardPopup.close();
}

function openBigPhoto(evt) {
  imagePopup.open({
      photoName: evt.target.closest(".element").querySelector(".element__title").textContent,
      photoLink: evt.target.src
    }
  )
}

function fillProfileForm() {
  userInfo.setUserInfo();
  profilePopup.close();
}

editButton.addEventListener('click', () => {
  profilePopup.open();
  userInfo.getUserInfo();
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
