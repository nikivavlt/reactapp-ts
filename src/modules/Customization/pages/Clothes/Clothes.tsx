import React, { useEffect, useState } from 'react';
import TabTitle from '../../components/TabTitle';
import TabContent from '../../components/TabContent';
import Headdress from './Tabs/Headdress';
import Torso from './Tabs/Torso';
import Legs from './Tabs/Legs';
import Footwear from './Tabs/Shoes';

const Clothes = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const aButtonCode = 65;
      const dButtonCode = 68;

      if (event.keyCode === aButtonCode) {
        (activeTab === 1) ? setActiveTab(4) : setActiveTab(activeTab - 1);
      }

      if (event.keyCode === dButtonCode) {
        (activeTab === 4) ? setActiveTab(1) : setActiveTab(activeTab + 1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [activeTab]);

  return (
    <>
      <ul className='tabs'>
          <TabTitle id={1} title="Головной убор" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabTitle id={2} title="Торс" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabTitle id={3} title="Ноги" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabTitle id={4} title="Обувь" activeTab={activeTab} setActiveTab={setActiveTab} />
      </ul>
      <TabContent id={1} activeTab={activeTab}>
        <Headdress></Headdress>
      </TabContent>
      <TabContent id={2} activeTab={activeTab}>
        <Torso></Torso>
      </TabContent>
      <TabContent id={3} activeTab={activeTab}>
        <Legs></Legs>
      </TabContent>
      <TabContent id={4} activeTab={activeTab}>
        <Footwear></Footwear>
      </TabContent>
    </>
  );
};

export default Clothes;