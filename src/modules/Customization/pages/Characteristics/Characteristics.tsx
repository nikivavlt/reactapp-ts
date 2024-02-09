import React, { useEffect, useState } from 'react';
import TabTitle from '../../components/TabTitle';
import TabContent from '../../components/TabContent';
import Genetics from './Tabs/Genetics';
import Appearance from './Tabs/Appearance';
import Features from './Tabs/Features';

const Characteristics = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const aButtonCode = 65;
      const dButtonCode = 68;

      if (event.keyCode === aButtonCode) {
        (activeTab === 1) ? setActiveTab(3) : setActiveTab(activeTab - 1);
      }

      if (event.keyCode === dButtonCode) {
        (activeTab === 3) ? setActiveTab(1) : setActiveTab(activeTab + 1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [activeTab]);

  return (
    <>
      <ul className='tabs'>
          <TabTitle id={1} title="Генетика" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabTitle id={2} title="Внешний вид" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabTitle id={3} title="Особенности" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>
      <TabContent id={1} activeTab={activeTab}>
        <Genetics />
      </TabContent>
      <TabContent id={2} activeTab={activeTab}>
        <Appearance />
      </TabContent>
      <TabContent id={3} activeTab={activeTab}>
        <Features />
      </TabContent>
    </>
  );
};

export default Characteristics;