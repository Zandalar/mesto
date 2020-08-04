let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__info_button-edit');
let closeProfile = popup.querySelector('.popup__button-close');
let saveProfile = popup.querySelector('.popup__button-save');
let profileName = document.querySelector('.profile__info_name');
let profileAbout = document.querySelector('.profile__info_about');
let newProfileName = popup.querySelector('#popup__field_name');
let newProfileAbout = popup.querySelector('#popup__field_about');
let popup__form = popup.querySelector('.popup__form');

function popupOpened() {
  popup.classList.toggle('popup_opened');
  newProfileName.value = profileName.textContent;
  newProfileAbout.value = profileAbout.textContent;
}

function popupSubmitHandler(event) {
  profileName.textContent = newProfileName.value;
  profileAbout.textContent = newProfileAbout.value;
  popupOpened();
  event.preventDefault();
}

editProfile.addEventListener('click', popupOpened);
closeProfile.addEventListener('click', popupOpened);
popup__form.addEventListener('submit', popupSubmitHandler);




