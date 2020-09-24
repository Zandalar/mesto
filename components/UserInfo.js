export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    const infoList = {};
    infoList.name = this._name.textContent;
    infoList.description = this._description.textContent;

    return infoList;
  }

  setUserInfo(newName, newDescription) {
    this._name.textContent = newName;
    this._description.textContent = newDescription;
  }
}
