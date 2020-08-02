let popup = document.querySelector('.popup');
let editProfile = document.querySelector('.profile__info_button-edit');
let closeProfile = popup.querySelector('.popup__button-close');
let saveProfile = popup.querySelector('.popup__button-save');
let profileName = document.querySelector('.profile__info_name');
let profileAbout = document.querySelector('.profile__info_about');
let newProfileName = document.querySelector('#popup__field_name');
let newProfileAbout = document.querySelector('#popup__field_about');

function popupOpened() {
  popup.classList.toggle('popup_opened');
  newProfileName.value = profileName.textContent;
  newProfileAbout.value = profileAbout.textContent;
}

function popupSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = newProfileName.value;
  profileAbout.textContent = newPofileAbout.value;
}

editProfile.addEventListener('click', popupOpened);
closeProfile.addEventListener('click', popupOpened);
saveProfile.addEventListener('submit', popupSubmitHandler);




