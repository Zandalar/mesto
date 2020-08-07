let popup = document.querySelector('.popup');
let profileForm = popup.querySelector('#profile__form');
let placeForm = popup.querySelector('#place__form');
let profileContainer = document.querySelector('#popup__profile');
let placeContainer = document.querySelector('#popup__place');

let editButton = document.querySelector('.profile__info_button-edit');
let addCardButton = document.querySelector('.profile__button-add');
let closeProfileButton = document.querySelector('#profile__button-close');
let closePlaceButton = document.querySelector('#place__button-close');
let saveProfileButton = popup.querySelector('.popup__button-save');

let profileName = document.querySelector('.profile__info_name');
let profileAbout = document.querySelector('.profile__info_about');
let newProfileName = popup.querySelector('#profile__name');
let newProfileDescription = popup.querySelector('#profile__description');

function togglePopup(container) {
  container.classList.toggle('popup_opened');
}

function fillProfileForm() {
  newProfileName.value = profileName.textContent;
  newProfileDescription.value = profileAbout.textContent;
}

function saveProfileForm(event) {
  event.preventDefault();
  profileName.textContent = newProfileName.value;
  profileAbout.textContent = newProfileDescription.value;
  togglePopup(profileContainer);
}

editButton.addEventListener('click', () => {
  togglePopup(profileContainer);
  fillProfileForm();
})

closeProfileButton.addEventListener('click', () => {togglePopup(profileContainer)});

closePlaceButton.addEventListener('click', () => {togglePopup(placeContainer)});

addCardButton.addEventListener('click', () => {togglePopup(placeContainer)});

profileForm.addEventListener('submit', saveProfileForm);
