const profileForm = document.querySelector('#profile__form');
const placeForm = document.querySelector('#place__form');
const profileContainer = document.querySelector('#popup__profile');
const placeContainer = document.querySelector('#popup__place');
const cardsContainer = document.querySelector('.element__table');
const imagePopupContainer = document.querySelector('#popup__image');
const templateContainer = document.querySelector('#templateContainer');

const bigPhoto = document.querySelector('.popup__image');
const imageTitle = document.querySelector('.popup__title_image');
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

function setCloseButtons() {
  const closeButtonList = Array.from(document.querySelectorAll('.popup__button-close'));

  closeButtonList.forEach((closeButton) => {
    closeButton.addEventListener ('click', (evt) => {
      const popupContainer = evt.target.closest('.popup');
      closePopup(popupContainer);
    })
  })
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

function addCard(name, link) {
  initialCards.push({name: name, link: link});
  renderCards(createCard(name, link));
  closePopup(placeContainer);
}

function renderCards(card) {
  cardsContainer.prepend(card);
}

function createCard(name, link) {
  const newCard = templateContainer.content.cloneNode(true);

  newCard.querySelector('.element__photo').src = link;
  newCard.querySelector('.element__photo').alt = name;
  newCard.querySelector('.element__title').textContent = name;

  const likeButton = newCard.querySelector('.element__button-like');
  likeButton.addEventListener('click', addLike);
  const deleteButton = newCard.querySelector('.element__button-delete');
  deleteButton.addEventListener('click', deleteCard);
  const cardPhoto = newCard.querySelector('.element__photo');
  cardPhoto.addEventListener('click', openBigPhoto);
  return newCard;
}

function addLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function openImage(evt) {
  const link = evt.target.getAttribute('src');
  const imageAlt = evt.target.getAttribute('alt');

  bigPhoto.setAttribute('src', link);
  bigPhoto.setAttribute('alt', imageAlt);
  imageTitle.textContent = imageAlt;
}

function openBigPhoto(evt) {
  openImage(evt);
  openPopup(imagePopupContainer);
}

function loadCards() {
  initialCards.forEach((item) => {
    createCard(item.name, item.link);
    renderCards(createCard(item.name, item.link));
  })
}

profileForm.addEventListener('submit', saveProfileForm);
placeForm.addEventListener('submit', () => addCard(inputPlaceName.value, inputPlaceLink.value));
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
loadCards();
