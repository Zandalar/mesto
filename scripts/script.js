let profileForm = document.querySelector('#profile__form');
let placeForm = document.querySelector('#place__form');
let profileContainer = document.querySelector('#popup__profile');
let placeContainer = document.querySelector('#popup__place');
let profileName = document.querySelector('.profile__info_name');
let profileDescription = document.querySelector('.profile__info_about');
let newProfileName = document.querySelector('#profile__name');
let newProfileDescription = document.querySelector('#profile__description');
let cardsContainer = document.querySelector('.element__table');

const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');
const closeProfileButton = document.querySelector('#profile__button-close');
const closePlaceButton = document.querySelector('#place__button-close');
const likeButton = document.querySelectorAll('.elements');
const deleteButton = document.querySelectorAll('.elements');

const initialCards = [
  {
      name: 'Москва',
      link: './images/moscow.png'
  },
  {
      name: 'Гора Эльбрус',
      link: './images/elbrus.png'
  },
  {
      name: 'Крым, Ласточкино гнездо',
      link: './images/krym.png'
  },
  {
      name: 'Домбай',
      link: './images/dombay.png'
  },
  {
      name: 'Карелия, Кижи',
      link: './images/kiji.png'
  },
  {
      name: 'Байкал',
      link: './images/baykal.png'
  }
];

function togglePopup(container) {
  container.classList.toggle('popup_opened');
}

function fillProfileForm() {
  newProfileName.value = profileName.textContent;
  newProfileDescription.value = profileDescription.textContent;
}

function saveProfileForm(event) {
  event.preventDefault();
  profileName.textContent = newProfileName.value;
  profileDescription.textContent = newProfileDescription.value;
  togglePopup(profileContainer);
}

function addCard(name, link) {
  event.preventDefault();

  const templateContainer = document.querySelector('#templateContainer').content;
  const addNewCard = templateContainer.cloneNode('true');

  addNewCard.querySelector('.element__photo').src = link;
  addNewCard.querySelector('.element__photo').alt = `Фото ${name}`;
  addNewCard.querySelector('.element__title').textContent = name;

  document.querySelector('#place__name').textContent = name;
  document.querySelector('#place__link').textContent = link;

  cardsContainer.prepend(addNewCard);
  togglePopup(placeContainer);
}

function renderCards(name, link) {
  const templateContainer = document.querySelector('#templateContainer').content;
  const addNewCard = templateContainer.cloneNode('true');

  addNewCard.querySelector('.element__photo').src = link;
  addNewCard.querySelector('.element__photo').alt = `Фото ${name}`;
  addNewCard.querySelector('.element__title').textContent = name;

  cardsContainer.append(addNewCard);
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

editButton.addEventListener('click', () => {
  togglePopup(profileContainer);
  fillProfileForm();
})

closeProfileButton.addEventListener('click', () => {togglePopup(profileContainer)});

closePlaceButton.addEventListener('click', () => {togglePopup(placeContainer)});

addCardButton.addEventListener('click', () => {togglePopup(placeContainer)});

profileForm.addEventListener('submit', saveProfileForm);

placeForm.addEventListener('submit', () => {
  const name = document.querySelector('#place__name');
  const link = document.querySelector('#place__link');
  addCard(name.value, link.value);
})

likeButton.forEach(function (item) {
  item.addEventListener('click', addLike);
})

deleteButton.forEach(function (item) {
  item.addEventListener('click', deleteCard);
})

initialCards.forEach((item) => renderCards(item.name, item.link));
