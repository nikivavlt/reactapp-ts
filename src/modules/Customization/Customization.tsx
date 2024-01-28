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
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>

      <Content activeTab={activeTab} />
  
      <p>{ errorMessage && errorMessage }</p>
      <button onClick={handleClick}>Создать персонажа</button>
    </>
  );
};

export default Customization;