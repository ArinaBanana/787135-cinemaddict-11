import AbstractComponent from "./abstract";

const createUserProfileTemplate = (grade) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${grade}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractComponent {
  constructor(grade) {
    super();

    this._grade = grade;
  }

  getTemplate() {
    return createUserProfileTemplate(this._grade);
  }
}
