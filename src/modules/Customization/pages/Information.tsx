import React, { useState } from 'react'

const Information = () => {
  const [userData, setUserData] = useState({ name: '', surname: '', gender: 'male', birthdayDate: 0})

  const handleChange = (event) => {
    const fieldKey = event.target.id;
    const fieldValue = event.target.value;

    setUserData({ ...userData, [fieldKey]: fieldValue });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(userData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Имя:
        <input type="text" id="name" placeholder="Имя" onChange={(event) => handleChange(event)} />
      </label>
      <label htmlFor="surname">
        Фамилия:
        <input type="text" id="surname" placeholder="Фамилия" onChange={(event) => handleChange(event)} />
      </label>
      <label htmlFor="gender">
        Выбор пола
        <label htmlFor="male">
          Мужской
          <input type="radio" id="gender" value="male" onChange={(event) => handleChange(event)} checked={userData.gender === 'male'} />
        </label>
        <label htmlFor="female">
          Женский
          <input type="radio" id="gender" value="female" onChange={(event) => handleChange(event)} checked={userData.gender === 'female'} />
        </label>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Information