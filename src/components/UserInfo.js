export default class UserInfo {
  constructor(nameElement, descriptionElement) {
    this._nameElement = nameElement;
    this._descriptionElement = descriptionElement;
  }

  getUserInfo() {
    this._profileData = {};
    this._profileData.name = this._nameElement.textContent;
    this._profileData.description = this._descriptionElement.textContent;
    return this._profileData;
  }

  setUserInfo(profileData) {
    this._nameElement.textContent = profileData.name;
    this._descriptionElement.textContent = profileData.description;
  }
}
