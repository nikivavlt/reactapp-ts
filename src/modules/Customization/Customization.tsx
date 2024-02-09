import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import isFormValid from '@/services/customization.service';

const Customization = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClick = () => {
    isFormValid()
      ? setErrorMessage('')
      : setErrorMessage('«Заполните вкладку "«Информация»');
  };

  return (
    <div className='customization'>
      <div className='background-noise'></div>
      <div className='background-fire'></div>
      <div className='background-el'></div>
      <div className='background-shadow'></div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>

      <Content activeTab={activeTab} />

      <section className='button-section'>
        { errorMessage && <div> { errorMessage } </div> }
        <button onClick={handleClick}>Создать персонажа</button>
      </section>
    </div>
  );
};

export default Customization;