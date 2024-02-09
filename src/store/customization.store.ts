import { makeAutoObservable } from 'mobx';

const defaultGender = 'male';

class Customization {
  private data = { 
    name: '',
    surname: '',
    gender: defaultGender,
    birthdayDate: '',
    clothes: {
      hat: 0,
      torso: 1,
      legs: 1,
      shoes: 1,
    }
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

  setHat(hat: number) {
    this.data.clothes.hat = hat;
  }

  setTorso(torso: number) {
    this.data.clothes.torso = torso;
  }

  setLegs(legs: number) {
    this.data.clothes.legs = legs;
  }

  setShoes(shoes: number) {
    this.data.clothes.shoes = shoes;
  }
}

const customization = new Customization();

export default customization;