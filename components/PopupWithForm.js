import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm ) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
   this._inputsList = this._popupSelector.querySelectorAll('.popup__field');
    this._fieldValues = {};
    this._inputsList.forEach((item) => {
      this._fieldValues[item.name] = item.value;
    });
    return this._fieldValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupSelector.querySelector('.popup__form').reset();
  }
}
