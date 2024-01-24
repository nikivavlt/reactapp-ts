import React, { useEffect, useState } from 'react'
import Information from './pages/Information'
import TabsHeader from './components/TabsHeader'
import TabContent from './components/TabContent';
import Characteristics from './pages/Characteristics';
import Clothes from './pages/Clothes';

const Customization = () => {
  const [activeTab, setActiveTab] = useState('information');

  useEffect(() => {
    console.log(activeTab)
  }, [activeTab]);

  return (
    <>
      <TabsHeader setActiveTab={setActiveTab} ></TabsHeader>

      <TabContent id="information" activeTab={activeTab}>
        <Information></Information>
      </TabContent>
      <TabContent id="characteristics" activeTab={activeTab}>
        <Characteristics></Characteristics>
      </TabContent>
      <TabContent id="clothes" activeTab={activeTab}>
        <Clothes></Clothes>
      </TabContent>
    </>
  )
}

export default Customization