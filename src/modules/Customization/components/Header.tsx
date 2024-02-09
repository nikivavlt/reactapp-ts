import React, { useEffect } from 'react';
import TabTitle from './TabTitle';
import '../Customization.scss';

interface IProps {
  activeTab: number;
  setActiveTab: (tabId: number) => void;
}

const Header = ({ activeTab, setActiveTab }: IProps) => {

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const qButtonCode = 81;
      const eButtonCode = 69;

      if (event.keyCode === qButtonCode) {
        if (activeTab === 1 && 
          (document.activeElement === document.getElementById('name') 
          || 
          document.activeElement === document.getElementById('surname'))
          ) return;

        (activeTab === 1) ? setActiveTab(3) : setActiveTab(activeTab - 1);
      }

      if (event.keyCode === eButtonCode) {
        if (activeTab === 1 && 
          (document.activeElement === document.getElementById('name') 
          || 
          document.activeElement === document.getElementById('surname'))
          ) return;

        (activeTab === 3) ? setActiveTab(1) : setActiveTab(activeTab + 1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [activeTab]);

  return (
    <ul className='header'>
      <TabTitle id={1} title='Информация' activeTab={activeTab} setActiveTab={setActiveTab}/>
      <TabTitle id={2} title='Характеристики' activeTab={activeTab} setActiveTab={setActiveTab}/>
      <TabTitle id={3} title='Одежда' activeTab={activeTab} setActiveTab={setActiveTab}/>
    </ul>
  );
};

export default Header;