import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submit = popupSelector.querySelector('.popup__button-confirm');
  }

  setFormSubmitHandler(set) {
    this._handleSubmit = set;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}
