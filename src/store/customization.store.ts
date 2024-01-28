import { makeAutoObservable } from 'mobx';

const defaultGender = 'male';

class Customization {
  private data = { 
    name: '',
    surname: '',
    gender: defaultGender,
    birthdayDate: ''
   };

  constructor() {
    makeAutoObservable(this);
  }

  getStoreData() {
    return this.data;
  }

  setName(name: string) {
    this.data.name = name;
  }

  setSurname(surname: string) {
    this.data.surname = surname;
  }

  setGender(gender: string) {
    this.data.gender = gender;
  }

  setBirthdayDate(birthdayDate: string) {
    this.data.birthdayDate = birthdayDate;
  }
}

const customization = new Customization();

export default customization;