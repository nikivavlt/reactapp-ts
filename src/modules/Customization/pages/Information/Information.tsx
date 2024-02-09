import React, { useEffect, useState } from 'react';
import customization from '@/store/customization.store';
import '../../Customization.scss';
import passportIcon from '@/assets/media/images/customization/icons/passport.svg';
const customizationStore = customization;

const regexPattern = new RegExp(/^[a-zA-Z]+$/);

const minimumAge = 18;
const maximumAge = 99;

const Information = () => {
  const [gender, setGender] = useState('male');
  const [birthdayErrorMessage, setBirthdayErrorMessage] = useState('');

  useEffect(() => {
    setGender(customizationStore.getStoreData().gender);
  }, []);

  const handleChange = (event) => {
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
    console.log(event.target)
    switch (fieldKey) {
      case 'name':
        customizationStore.setName(event.target.value);
        break;
      case 'surname':
        customizationStore.setSurname(event.target.value);
        break;
      case 'birthdayDate':
        customizationStore.setBirthdayDate(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleGender = (gender) => {
    setGender(gender);
    customizationStore.setGender(gender);
  };

  return (
    <form className='form'>
      <div className='input-fields'>
        <label htmlFor="name">
          <img className='passport-icon' src={passportIcon} alt="Passport icon" />
          <input type="text" id="name" placeholder="Имя"
            onChange={(event) => handleChange(event)} />
        </label>
        <label htmlFor="surname">
          <input type="text" id="surname" placeholder="Фамилия"
            onChange={(event) => handleChange(event)} />
        </label>
      </div>
      <label htmlFor="gender">
        <p className='gender__title'>Выбор пола</p>
        <div className='gender__buttons'>
          <label className='gender-male' htmlFor="male" onClick={() => handleGender('male')} >
            Мужской
            <input type="radio" id="gender" value="male"
              onChange={(event) => handleChange(event)} 
              checked={gender === 'male'} />
            <div className='radio-image'></div>
          </label>
          <label className='gender-female' htmlFor="female" onClick={() => handleGender('female')} >
            Женский
            <input type="radio" id="gender" value="female" 
              onChange={(event) => handleChange(event)} 
              checked={gender === 'female'} />
            <div className='radio-image'></div>
          </label>
        </div>
      </label>
      <label htmlFor="birthdayDate">
        <p className='birthday__title'>Возраст персонажа</p>
        <div>
          <input type="date" id="birthdayDate" 
            onChange={(event) => handleChange(event)} />
          <p className='birthday__error'>{ birthdayErrorMessage && birthdayErrorMessage}</p>
        </div>
      </label>
    </form>
  );
};

export default Information;