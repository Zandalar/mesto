export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    this._profileData = {};
    this._profileData.name = this._name.textContent;
    this._profileData.about = this._about.textContent;
    return this._profileData;
  }

  setUserInfo(profileData) {
    this._name.textContent = profileData.name;
    this._about.textContent = profileData.about;
    this._avatar.src = profileData.avatar;
  }
}
