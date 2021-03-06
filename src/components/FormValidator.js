export default class FormValidator {
  constructor(arr, formElement) {
    this._formSelector = arr.formSelector;
    this._inputSelector = arr.inputSelector;
    this._submitButtonSelector = arr.submitButtonSelector;
    this._inactiveButtonClass = arr.inactiveButtonClass;
    this._inputErrorClass = arr.inputErrorClass;
    this._errorClass = arr.errorClass;
    this._formElement = formElement;
    this._inputs = this._formElement.querySelectorAll('.popup__field');
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    )
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    )
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    )
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    )

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }
// Эта функция убирает ошибки в инпутах, если открыть попап, а перед этим закрыть его с неправильно заполненными полями
  checkInputValidity() {
    const inputList = Array.from(this._inputs);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListeners();
    })
  }
}
