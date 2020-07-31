let editProfile = document.querySelector('.profile__info_button-edit');
let popup = document.querySelector('.popup');
let closeProfile = document.querySelector('.popup__button-close');

function popupOpened() {
  popup.classList.add('popup_opened');
}

function popupClosed() {
  popup.classList.remove('popup_opened');
}

editProfile.addEventListener('click', popupOpened);
closeProfile.addEventListener('click', popupClosed);


