import customization from '@/store/customization.store';
import React, { useEffect, useState } from 'react';

const femaleTorsoIds = [0, 16, 40, 75, 103, 400];
const maleTorsoIds = [1, 5, 12, 26, 41, 57];

const customizationStoreData = customization.getStoreData();

const Torso = () => {
  const isMale = () => customizationStoreData.gender === 'male' ? true : false;

  const [selectedTorso, setSelectedTorso] = useState(isMale() ? 1 : 0);

  useEffect(() => {
    setSelectedTorso(customizationStoreData.clothes.torso);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const selectedId = event.target.getAttribute('data-id');

    customization.setTorso(selectedId);
    setSelectedTorso(selectedId);
  };

  return (
    <div>
      { customizationStoreData.gender === 'male' 
        ?
        <ul className='clothes-grid'>
          { maleTorsoIds.map((torsoId) => {
            return (
              <li onClick={handleClick} data-id={torsoId} key={torsoId} id={torsoId == selectedTorso ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/tops/male/${torsoId}.png`)} alt="Torso" />
              </li>
            );
          })}
        </ul>          
        : 
        <ul className='clothes-grid'>
          { femaleTorsoIds.map((torsoId) => {
            return (
              <li onClick={handleClick} data-id={torsoId} key={torsoId} id={torsoId == selectedShoes ? 'active-element' : ''}>
                <img src={require(`../../../../../assets/media/images/customization/tops/female/${torsoId}.png`)} alt="Torso" />
              </li>
            );
          })}
        </ul> 
      }
    </div>
  );
};

export default Torso;