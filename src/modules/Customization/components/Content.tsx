import React from 'react';
import TabContent from './TabContent';
import Information from '../pages/Information/Information';
import Characteristics from '../pages/Characteristics/Characteristics';
import Clothes from '../pages/Clothes/Clothes';

interface IProps {
    activeTab: number;
}

const Content = ({ activeTab }: IProps) => {
  return (
    <>
      <TabContent id={1} activeTab={activeTab}>
        <Information />
      </TabContent>
      <TabContent id={2} activeTab={activeTab}>
        <Characteristics></Characteristics>
      </TabContent>
      <TabContent id={3} activeTab={activeTab}>
        <Clothes></Clothes>
      </TabContent>
    </>
  );
};

export default Content;