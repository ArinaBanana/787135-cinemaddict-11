import AbstractSmartComponent from "./abstract-smart";

const createUserProfileTemplate = (grade) => {
  return (
    `<section class="header__profile profile">
      ${grade ? `<p class="profile__rating">${grade}</p>` : ``}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractSmartComponent {
  setGrade(grade) {
    this._grade = grade;
    this.rerender();
  }

  getTemplate() {
    return createUserProfileTemplate(this._grade);
  }

  recoveryListeners() {
    return null;
  }
}
