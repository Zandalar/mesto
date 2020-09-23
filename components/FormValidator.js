import { popupArray } from "../utils/constants.js";

export default class FormValidator {
  constructor(arr, formElement) {
    this._formSelector = arr.formSelector;
    this._inputSelector = arr.inputSelector;
    this._submitButtonSelector = arr.submitButtonSelector;
    this._inactiveButtonClass = arr.inactiveButtonClass;
    this._inputErrorClass = arr.inputErrorClass;
    this._errorClass = arr.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );

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
    });
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
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }
}
// функция сбрасывает ошибки при открытии, если закрыть попап, не сохранив данные и оставив поля с ошибками
export function checkPopupValidity(container, arr) {
  const formElement = container.querySelector(arr.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(arr.inputSelector));
  const val = new FormValidator(popupArray, container);

  formElement.reset();
  if (formElement.textContent.length > 0) {
    inputList.forEach((inputElement) => {
      val._hideInputError(inputElement);
    });
  }
}
