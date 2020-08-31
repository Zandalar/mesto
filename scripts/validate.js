function showInputError(formElement, inputElement, classList) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(classList.inputErrorClass);
  errorElement.classList.add(classList.errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, classList) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(classList.inputErrorClass);
  errorElement.classList.remove(classList.errorClass);
  errorElement.textContent = '';
}

function checkValidity(formElement, inputElement, classList) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, classList);
  } else {
    hideInputError(formElement, inputElement, classList);
  }
}

function checkPopupValidity(container, classList) {
  const formElement = container.querySelector(classList.formSelector);
  if (formElement.textContent.length > 0) {
    const inputList = Array.from(formElement.querySelectorAll(classList.inputSelector));

    inputList.forEach((inputElement) => {
      formElement.reset();
      hideInputError(formElement, inputElement, classList);
    })
  }
}

function setEventListeners(formElement, classList) {
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

function enableValidation(classList) {
  const formList = Array.from(document.querySelectorAll(classList.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      setEventListeners(formElement, classList);
    })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, classList) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classList.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(classList.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
}

enableValidation(popupArray);
