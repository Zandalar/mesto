let profileForm = document.querySelector('#profile__form');
let placeForm = document.querySelector('#place__form');
let profileContainer = document.querySelector('#popup__profile');
let placeContainer = document.querySelector('#popup__place');
let profileName = document.querySelector('.profile__info_name');
let profileDescription = document.querySelector('.profile__info_about');
let newProfileName = document.querySelector('#profile__name');
let newProfileDescription = document.querySelector('#profile__description');

const editButton = document.querySelector('.profile__info_button-edit');
const addCardButton = document.querySelector('.profile__button-add');
const closeProfileButton = document.querySelector('#profile__button-close');
const closePlaceButton = document.querySelector('#place__button-close');

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
  const cardsContainer = document.querySelector('.element__table');

  addNewCard.querySelector('.element__photo').src = link;
  addNewCard.querySelector('.element__photo').alt = `Фото ${name}`;
  addNewCard.querySelector('.element__title').textContent = name;

  document.querySelector('#place__name').textContent = name;
  document.querySelector('#place__link').textContent = link;

  cardsContainer.prepend(addNewCard);
  togglePopup(placeContainer);
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
