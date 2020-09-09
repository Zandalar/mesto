export const popupArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

class FormValidator {
  constructor(arr, formElement) {
    this._formSelector = arr.formSelector;
    this._inputSelector = arr.inputSelector;
    this._submitButtonSelector = arr.submitButtonSelector;
    this._inactiveButtonClass = arr.inactiveButtonClass;
    this._inputErrorClass = arr.inputErrorClass;
    this._errorClass = arr.errorClass;
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _checkPopupValidity(container) {
    const formElement = container.querySelector(this._formSelector);
    if (formElement.textContent.length > 0) {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));

      inputList.forEach((inputElement) => {
        formElement.reset();
        this._hideInputError(formElement, inputElement);
      })
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      })
    })
  }

  _enableValidation(classList) {
    const formList = Array.from(document.querySelectorAll(classList.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      setEventListeners(formElement, classList);
    })
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement, classList) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(classList.inactiveButtonClass);
      buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(classList.inactiveButtonClass);
      buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  enableValidation(popupArray);
}
