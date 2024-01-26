import React, { useEffect } from 'react';

interface IProps {
  setActiveTab: (tabId: number) => void;
}

const TabsHeader = ({ activeTab, setActiveTab }: IProps) => {

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 81) {
        console.log('Q');
        setActiveTab(activeTab - 1);
      }

      if (event.keyCode === 69) {
        (activeTab === 3) ? setActiveTab(1) : setActiveTab(activeTab + 1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleClick = ((event: React.MouseEvent<HTMLElement>) => {
    const tabId = event.target.id;

    setActiveTab(tabId);
  });

  return (
    <ul className="nav">
        <li onClick={(event) => handleClick(event)} id={1}>Информация</li>
        <li onClick={(event) => handleClick(event)} id={2}>Характеристики</li>
        <li onClick={(event) => handleClick(event)} id={3}>Одежда</li>
    </ul>
  );
};

export default TabsHeader;