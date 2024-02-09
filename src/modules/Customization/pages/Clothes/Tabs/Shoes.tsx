import customization from '@/store/customization.store';
import React, { useEffect, useState } from 'react';

const femaleShoesIds = [1, 6, 14, 15, 16, 23];
const maleShoesIds = [1, 7, 10, 16, 49, 76];

const customizationStoreData = customization.getStoreData();

const Shoes = () => {
  const [selectedShoes, setSelectedShoes] = useState(1);

  useEffect(() => {
    setSelectedShoes(customizationStoreData.clothes.shoes);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const selectedId = event.target.getAttribute('data-id');

    customization.setShoes(selectedId);
    setSelectedShoes(selectedId);
  };

  return (
    <div>
      { customizationStoreData.gender === 'male' 
        ?
        <ul className='clothes-grid'>
          { maleShoesIds.map((shoesId) => {
            return (
              <li onClick={handleClick} data-id={shoesId} key={shoesId} id={shoesId == selectedShoes ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/shoes/male/${shoesId}.png`)} alt="Shoes" />
              </li>
            );
          })}
        </ul>          
        : 
        <ul className='clothes-grid'>
          { femaleShoesIds.map((shoesId) => {
            return (
              <li onClick={handleClick} data-id={shoesId} key={shoesId} id={shoesId == selectedShoes ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/shoes/female/${shoesId}.png`)} alt="Shoes" />
              </li>
            );
          })}
        </ul> 
      }
    </div>
  );
};

export default Shoes;