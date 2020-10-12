export const popupArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}
//Containers
export const profileContainer = document.querySelector('#popup__profile');
export const placeContainer = document.querySelector('#popup__place');
export const cardsContainer = document.querySelector('.element__table');
export const imageContainer = document.querySelector('#popup__image');
export const templateContainer = document.querySelector('#templateContainer');
export const deleteContainer = document.querySelector('#popup__deletion');
export const avatarContainer = document.querySelector('#popup__avatar')
//Forms, inputs
export const profileForm = document.querySelector('#profile__form');
export const placeForm = document.querySelector('#place__form');
export const avatarForm = document.querySelector('#avatar__form');
export const profileName = document.querySelector('.profile__info_name');
export const profileDescription = document.querySelector('.profile__info_about');
export const inputProfileName = document.querySelector('#profile__name');
export const inputProfileDescription = document.querySelector('#profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');
//Buttons
export const editButton = document.querySelector('.profile__info_button-edit');
export const addCardButton = document.querySelector('.profile__button-add');
export const editAvatarButton = document.querySelector('.profile__button-avatar');
export const submitProfileButton = document.querySelector('#profile__button-save');
export const submitPlaceButton = document.querySelector('#place__button-save');
export const submitAvatarButton = document.querySelector('#avatar__button-save');
export const submitDeleteButton = document.querySelector('#deletion__button-confirm');
