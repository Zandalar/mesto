let popup = document.querySelector('.popup');
let profileForm = popup.querySelector('#profile__form');
let placeForm = popup.querySelector('#place__form');
let profileContainer = document.querySelector('#popup__profile');
let placeContainer = document.querySelector('#popup__place');

let editButton = document.querySelector('.profile__info_button-edit');
let addCardButton = document.querySelector('.profile__button-add');
let closeButton = document.querySelector('.popup__button-close');
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

function closePopup() {
  let closeButtonSelector = document.querySelector('.');
  if (closeButtonSelector.classList.contains('popup_opened')) {
    closeButtonSelector.classList.remove('popup_opened');
  }
}

editButton.addEventListener('click', () => {
  togglePopup(profileContainer);
  fillProfileForm();
})

closeButton.addEventListener('click', closePopup);    //хочу повесить на один обработчик события все кнопки закрытия(нужно прописать логику поиска открытого попапа)

addCardButton.addEventListener('click', () => {
  togglePopup(placeContainer);
})

profileForm.addEventListener('submit', saveProfileForm);
