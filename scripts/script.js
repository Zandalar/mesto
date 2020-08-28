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

function openPopup(container) {
  container.classList.add('popup_opened');
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
  resetErrorMessages(evt);
}

function resetErrorMessages(evt) {
  const errorMessageList = Array.from(evt.target.closest('.popup').querySelectorAll('.popup__field-error'));
  const inputList = Array.from(evt.target.closest('.popup').querySelectorAll('.popup__field'));

    if (inputList.length > 0) {
      evt.target.closest('.popup').querySelector('.popup__form').reset();

      errorMessageList.forEach((item) => {
        item.classList.remove('popup__field-error_active');
        item.textContent = '';
      })

      inputList.forEach((input) => {
        input.classList.remove('popup__field_type_error');
      })
    }
}

function fillProfileForm() {
  inputProfileName.value = profileName.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function saveProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closePopup(evt);
}

function addCard(name, link, evt) {
  initialCards.push({name: name, link: link});
  renderCards(createCard(name, link));
  closePopup(evt);
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
  openPopup(imagePopupContainer);
}

function setCloseButtons() {
  const closeButtonList = Array.from(document.querySelectorAll('.popup__button-close'));

    closeButtonList.forEach((closeButton) => {
      closeButton.addEventListener ('click', (evt) => {
        closePopup(evt);
      })
    })
}

function closeOnOverlay() {
  const overlayList = Array.from(document.querySelectorAll('.popup'));

  overlayList.forEach((overlay) => {
    overlay.addEventListener('mousedown', (evt) => {
      const popupContainer = evt.target.closest('.popup__container');
      const imageContainer = evt.target.closest('.popup__container_image');
      if (!popupContainer && !imageContainer) {
        closePopup(evt);
      }
    })
  })
}

function closeOnEscape() {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === "Escape") {
      document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
  })
}

function loadCards() {
  initialCards.forEach((item) => {
    createCard(item.name, item.link);
    renderCards(createCard(item.name, item.link));
  })
}

closeOnOverlay();
closeOnEscape();
setCloseButtons();
loadCards();

addCardButton.addEventListener('click', () => openPopup(placeContainer));
profileForm.addEventListener('submit', saveProfileForm);
placeForm.addEventListener('submit', (evt) => addCard(inputPlaceName.value, inputPlaceLink.value, evt));
editButton.addEventListener('click', () => {
  openPopup(profileContainer);
  fillProfileForm();
})
