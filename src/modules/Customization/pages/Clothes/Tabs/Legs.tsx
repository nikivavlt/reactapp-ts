import customization from '@/store/customization.store';
import React, { useEffect, useState } from 'react';

const femaleLegsIds = [0, 12, 16, 25, 27, 43];
const maleLegsIds = [4, 8, 12, 22, 33, 78];

const customizationStoreData = customization.getStoreData();

const Legs = () => {
  const isMale = () => customizationStoreData.gender === 'male' ? true : false;

  const [selectedLegs, setSelectedLegs] = useState(isMale() ? 4 : 0);

  useEffect(() => {
    setSelectedLegs(isMale() ? 4 : 0);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const selectedId = event.target.getAttribute('data-id');
    console.log(selectedId)
    customization.setLegs(selectedId);
    setSelectedLegs(selectedId);
  };

  return (
    <div>
      { customizationStoreData.gender === 'male' 
        ?
        <ul className='clothes-grid'>
          { maleLegsIds.map((legsId) => {
            return (
              <li onClick={handleClick} data-id={legsId} key={legsId} id={legsId == selectedLegs ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/legs/male/${legsId}.png`)} alt="Hair" />
              </li>
            );
          })}
        </ul>          
        : 
        <ul className='clothes-grid'>
          { femaleLegsIds.map((legsId) => {
            return (
              <li onClick={handleClick} data-id={legsId} key={legsId} id={legsId == selectedLegs ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/legs/female/${legsId}.png`)} alt="Hair" />
              </li>
            );
          })}
        </ul> 
      }
    </div>
  );
};

export default Legs;