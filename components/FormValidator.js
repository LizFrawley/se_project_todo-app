import {
  checkInputValidity,
  toggleButtonState,
  hideInputError,
} from "../scripts/validate.js";

class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      hideInputError(this._formElement, inputElement, this._settings);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );

    toggleButtonState(this._inputList, buttonElement, this._settings);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, buttonElement, this._settings);
      });
    });
    console.log("Success");
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      hideInputError(this._formElement, inputElement, this._settings);
    });
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    toggleButtonState(this._inputList, buttonElement, this._settings);
  }
}

export default FormValidator;
