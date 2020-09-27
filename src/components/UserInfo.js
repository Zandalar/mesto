import { inputProfileName, inputProfileDescription } from "../utils/constants.js";

export default class UserInfo {
  constructor({ nameElement, descriptionElement }) {
    this._nameElement = nameElement;
    this._descriptionElement = descriptionElement;
  }

  getUserInfo() {
    inputProfileName.value = this._nameElement.textContent;
    inputProfileDescription.value = this._descriptionElement.textContent;
  }

  setUserInfo() {
    this._nameElement.textContent = inputProfileName.value;
    this._descriptionElement.textContent = inputProfileDescription.value;
  }
}
