const popupArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

const showInputError = (formElement, inputElement, classList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(classList.inputErrorClass);
  errorElement.classList.add(classList.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (formElement, inputElement, classList) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(classList.inputErrorClass);
  errorElement.classList.remove(classList.errorClass);
  errorElement.textContent = '';
}

const checkValidity = (formElement, inputElement, classList) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, classList);
  } else {
    hideInputError(formElement, inputElement, classList);
  }
}

const setEventListeners = (formElement, classList) => {
  const inputList = Array.from(formElement.querySelectorAll(classList.inputSelector));
  const buttonElement = formElement.querySelector(classList.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, classList);
      toggleButtonState(inputList, buttonElement, classList);
    })
  })
}

const enableValidation = (classList) => {
  const formList = Array.from(document.querySelectorAll(classList.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      setEventListeners(formElement, classList);
    })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, classList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classList.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(classList.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};

enableValidation(popupArray);
