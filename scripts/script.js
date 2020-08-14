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
const likeButton = document.querySelectorAll('.elements');
const deleteButton = document.querySelectorAll('.elements');

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
  event.preventDefault();

  initialCards.unshift({name: name, link: link});
  togglePopup(placeContainer);
  renderCards(name, link);
}

function renderCards(name, link) {
  const addNewCard = templateContainer.content.cloneNode('true');

  addNewCard.querySelector('.element__photo').src = link;
  addNewCard.querySelector('.element__photo').alt = name;
  addNewCard.querySelector('.element__title').textContent = name;

  likeButton.forEach(function (item) {
  item.addEventListener('click', addLike);
  })

  deleteButton.forEach(function (item) {
  item.addEventListener('click', deleteCard);
  })

  cardsContainer.addEventListener('click', openBigPhoto);

  cardsContainer.prepend(addNewCard);
}

function addLike(evt) {
  if (evt.target.classList.contains('element__button-like')) {
    evt.target.classList.toggle('element__button-like_active');
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains('element__button-delete_bottom') || evt.target.classList.contains('element__button-delete_top')) {
    evt.target.closest('.element').remove();
  }
}

function openImage(evt) {
  const link = evt.target.getAttribute('src');
  const imageAlt = evt.target.getAttribute('alt');
  
  bigPhoto.setAttribute('src', link);
  bigPhoto.setAttribute('alt', imageAlt);
  imageTitle.textContent = imageAlt;
}

function openBigPhoto(evt) {
  if (evt.target.classList.contains('element__photo')) {
    openImage(evt);
    togglePopup(imagePopupContainer);
  }
}

editButton.addEventListener('click', () => {togglePopup(profileContainer), fillProfileForm()});

closeProfileButton.addEventListener('click', () => togglePopup(profileContainer));

closePlaceButton.addEventListener('click', () => togglePopup(placeContainer));

closeImageButton.addEventListener('click', () => togglePopup(imagePopupContainer));

addCardButton.addEventListener('click', () => togglePopup(placeContainer));

profileForm.addEventListener('submit', saveProfileForm);

placeForm.addEventListener('submit', () => addCard(inputPlaceName.value, inputPlaceLink.value));

initialCards.forEach((item) => renderCards(item.name, item.link));
