import React, { useEffect, useRef, useState } from 'react';
import Information from './pages/Information';
import TabsHeader from './components/TabsHeader';
import TabContent from './components/TabContent';
import Characteristics from './pages/Characteristics';
import Clothes from './pages/Clothes';

const Customization = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab]);

  return (
    <>
      <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab}></TabsHeader>
      <TabContent id={1} activeTab={activeTab}>
        <Information formRef={formRef} setErrorMessage={setErrorMessage} />
      </TabContent>
      <TabContent id={2} activeTab={activeTab}>
        <Characteristics></Characteristics>
      </TabContent>
      <TabContent id={3} activeTab={activeTab}>
        <Clothes></Clothes>
      </TabContent>
      <p>{ errorMessage && errorMessage }</p>
      <button onClick={() => formRef.current?.requestSubmit()}>Создать персонажа</button>
    </>
  );
};

export default Customization;