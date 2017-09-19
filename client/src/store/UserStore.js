import { observable, action } from "mobx";
export default class UserStore {
  @observable user = null;

  @action set(user) {
    this.user = user;
  }

  @action reset() {
   this.user = null;
  }
}
