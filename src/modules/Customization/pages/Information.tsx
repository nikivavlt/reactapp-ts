import React, { useState } from 'react';

interface IProps {
  formRef: HTMLFormElement;
  setErrorMessage: (message: string) => void;
}

const defaultGender = 'male';
const defaultFieldLength = 16;
const regexPattern = new RegExp(/^[a-zA-Z]+$/);
const minimumAge = 18;
const maximumAge = 99;

const Information = ({ formRef, setErrorMessage }: IProps) => {
  const [userData, setUserData] = useState(
    { name: '', 
      surname: '', 
      gender: defaultGender, 
      birthdayDate: ''
    }
  );

  const [birthdayErrorMessage, setBirthdayErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldKey = event.target.id;
    const fieldValue = event.target.value;

    if (fieldKey === 'name' || fieldKey === 'surname') {
      if (!regexPattern.test(fieldValue)) {
        setUserData({ ...userData, [fieldValue]: ''});
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
      }
    }
    setBirthdayErrorMessage('');

    setUserData({ ...userData, [fieldKey]: fieldValue });
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    if (userData.name === '' || userData.surname === '' || userData.birthdayDate === ''
        || userData.name.length > defaultFieldLength || userData.surname.length > defaultFieldLength) 
    {
      setErrorMessage('«Заполните вкладку "«Информация»');
    } else {
      setErrorMessage('');
      console.log(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} >
      <label htmlFor="name">
        Имя:
        <input type="text" id="name" placeholder="Имя" value={userData.name}
          onChange={(event) => handleChange(event)} />
      </label>
      <label htmlFor="surname">
        Фамилия:
        <input type="text" id="surname" placeholder="Фамилия" value={userData.surname}
          onChange={(event) => handleChange(event)} />
      </label>
      <label htmlFor="gender">
        Выбор пола
        <label htmlFor="male">
          Мужской
          <input type="radio" id="gender" value="male" 
            onChange={(event) => handleChange(event)} checked={userData.gender === 'male'} />
        </label>
        <label htmlFor="female">
          Женский
          <input type="radio" id="gender" value="female" 
            onChange={(event) => handleChange(event)} checked={userData.gender === 'female'} />
        </label>
      </label>
      <input type="date" id="birthdayDate" onChange={(event) => handleChange(event)} />
      <p>{ birthdayErrorMessage && birthdayErrorMessage}</p>
    </form>
  );
};

export default Information;