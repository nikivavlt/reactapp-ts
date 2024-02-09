import customization from '@/store/customization.store';
import React, { useEffect, useState } from 'react';
import '../../../Customization.scss';

const femaleHeaddressIds = [0, 4, 5, 11, 14, 20];
const maleHeaddressIds = [0, 4, 5, 12, 14, 20];

const customizationStoreData = customization.getStoreData();

const Headdress = () => {
  const [selectedHat, setSelectedHat] = useState(0);

  useEffect(() => {
    setSelectedHat(customizationStoreData.clothes.hat);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const selectedId = event.target.getAttribute('data-id');

    customization.setHat(selectedId);
    setSelectedHat(selectedId);
  };

  return (
    <div>
      { customizationStoreData.gender === 'male' 
        ?
        <ul className='clothes-grid'>
          { maleHeaddressIds.map((headdressId) => {
            return (
              <li onClick={handleClick} data-id={headdressId} key={headdressId} id={headdressId == selectedHat ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/hats/male/${headdressId}.png`)} alt="Headdress" />
              </li>
            );
          })}
        </ul>          
        : 
        <ul className='clothes-grid'>
          { femaleHeaddressIds.map((headdressId) => {
            return (
              <li onClick={handleClick} data-id={headdressId} key={headdressId} id={headdressId == selectedHat ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/hats/female/${headdressId}.png`)} alt="Headdress" />
              </li>
            );
          })}
        </ul> 
      }
    </div>
  );
};

export default Headdress;