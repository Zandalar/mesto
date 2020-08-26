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
const closeProfileButton = document.querySelector('#profile__button-close');
const closePlaceButton = document.querySelector('#place__button-close');
const closeImageButton = document.querySelector('#image__button-close');

const initialCards = [
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

function togglePopup(container) {
  container.classList.toggle('popup_opened');
}

function fillProfileForm() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function saveProfileForm(event) {
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  togglePopup(profileContainer);
}

function addCard(name, link) {
  initialCards.unshift({name: name, link: link});
  togglePopup(placeContainer);
  renderCards(createCard(name, link));
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
  togglePopup(imagePopupContainer);
}

editButton.addEventListener('click', () => {togglePopup(profileContainer), fillProfileForm()});

closeProfileButton.addEventListener('click', () => togglePopup(profileContainer));

closePlaceButton.addEventListener('click', () => togglePopup(placeContainer));

closeImageButton.addEventListener('click', () => togglePopup(imagePopupContainer));

addCardButton.addEventListener('click', () => togglePopup(placeContainer));

profileForm.addEventListener('submit', saveProfileForm);

placeForm.addEventListener('submit', () => addCard(inputPlaceName.value, inputPlaceLink.value));

initialCards.forEach((item) => {createCard(item.name, item.link), renderCards(createCard(item.name, item.link))});
