import React, { useState } from 'react';
import customization from '@/store/customization.store';

const customizationStore = customization;

const regexPattern = new RegExp(/^[a-zA-Z]+$/);

const minimumAge = 18;
const maximumAge = 99;

const Information = () => {
  const [birthdayErrorMessage, setBirthdayErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldKey = event.target.id;
    const fieldValue = event.target.value;

    if (fieldKey === 'name' || fieldKey === 'surname') {
      if (!regexPattern.test(fieldValue)) {
        if (fieldKey === 'name') event.target.value = customizationStore.getStoreData().name;
        if (fieldKey === 'surname') event.target.value = customizationStore.getStoreData().surname;
        return;
      }
    }

    if (fieldKey === 'birthdayDate') {
      const today = new Date();
      const birthdayDate = new Date(fieldValue);

      const ageDifferenceMilliseconds = today.getTime() - birthdayDate.getTime();
      const ageDate = new Date(ageDifferenceMilliseconds);

      const age = (ageDate.getUTCFullYear() - 1970);

      if (age < minimumAge) {
        setBirthdayErrorMessage('Минимальный возраст 18 лет');
        return;
      }
      else if (age > maximumAge) {
        setBirthdayErrorMessage('Максимальный возраст 99 лет');
        return;
      } else {
        setBirthdayErrorMessage('');
      }
    }

    switch (fieldKey) {
      case 'name':
        customizationStore.setName(event.target.value);
        break;
      case 'surname':
        customizationStore.setSurname(event.target.value);
        break;
      case 'gender':
        customizationStore.setGender(event.target.value);
        break;
      case 'birthdayDate':
        customizationStore.setBirthdayDate(event.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <form>
      <label htmlFor="name">
        Имя:
        <input type="text" id="name" placeholder="Имя"
          onChange={(event) => handleChange(event)} />
      </label>
      <label htmlFor="surname">
        Фамилия:
        <input type="text" id="surname" placeholder="Фамилия"
          onChange={(event) => handleChange(event)} />
      </label>
      <label htmlFor="gender">
        Выбор пола
        <label htmlFor="male">
          Мужской
          <input type="radio" id="gender" value="male" 
            onChange={(event) => handleChange(event)} 
            checked={customizationStore.getStoreData().gender === 'male'} />
        </label>
        <label htmlFor="female">
          Женский
          <input type="radio" id="gender" value="female" 
            onChange={(event) => handleChange(event)} 
            checked={customizationStore.getStoreData().gender === 'female'} />
        </label>
      </label>
      <input type="date" id="birthdayDate" 
        onChange={(event) => handleChange(event)} />
      <p>{ birthdayErrorMessage && birthdayErrorMessage}</p>
    </form>
  );
};

export default Information;