import customization from '@/store/customization.store';
import React from 'react';

const hairdsIds = 31;
const colors = [
  { id: 0, hex: '#1c1f21' },
  { id: 1, hex: '#272a2c' },
  { id: 2, hex: '#312e2c' },
  { id: 3, hex: '#35261c' },
  { id: 4, hex: '#4b321f' },
  { id: 5, hex: '#5c3b24' },
  { id: 6, hex: '#6d4c35' },
  { id: 7, hex: '#6b503b' },
  { id: 8, hex: '#765c45' },
  { id: 9, hex: '#7f684e' },
  { id: 10, hex: '#99815d' },
  { id: 11, hex: '#a79369' },
  { id: 12, hex: '#af9c70' },
  { id: 13, hex: '#bba063' },
  { id: 14, hex: '#d6b97b' },
  { id: 15, hex: '#dac38e' },
  { id: 16, hex: '#9f7f59' },
  { id: 17, hex: '#845039' },
  { id: 18, hex: '#682b1f' },
  { id: 19, hex: '#61120c' },
  { id: 20, hex: '#640f0a' },
  { id: 21, hex: '#7c140f' },
  { id: 22, hex: '#a02e19' },
  { id: 23, hex: '#b64b28' },
  { id: 24, hex: '#a2502f' },
  { id: 25, hex: '#aa4e2b' },
  { id: 26, hex: '#626262' },
  { id: 27, hex: '#808080' },
  { id: 28, hex: '#aaaaaa' },
  { id: 29, hex: '#c5c5c5' },
  { id: 30, hex: '#463955' },
  { id: 31, hex: '#5a3f6b' },
  { id: 32, hex: '#763c76' },
  { id: 33, hex: '#ed74e3' },
  { id: 34, hex: '#eb4b93' },
  { id: 35, hex: '#f299bc' },
  { id: 36, hex: '#04959e' },
  { id: 37, hex: '#025f86' },
  { id: 38, hex: '#023974' },
  { id: 39, hex: '#3fa16a' },
  { id: 40, hex: '#217c61' },
  { id: 41, hex: '#185c55' },
  { id: 42, hex: '#b6c034' },
  { id: 43, hex: '#70a90b' },
  { id: 44, hex: '#439d13' },
  { id: 45, hex: '#dcb857' },
  { id: 46, hex: '#e5b103' },
  { id: 47, hex: '#e69102' },
  { id: 48, hex: '#f28831' },
  { id: 49, hex: '#fb8057' },
  { id: 50, hex: '#e28b58' },
  { id: 51, hex: '#d1593c' },
  { id: 52, hex: '#ce3120' },
  { id: 53, hex: '#ad0903' },
  { id: 54, hex: '#880302' },
  { id: 55, hex: '#1f1814' },
  { id: 56, hex: '#291f19' },
  { id: 57, hex: '#2e221b' },
  { id: 58, hex: '#37291e' },
  { id: 59, hex: '#2e2218' },
  { id: 60, hex: '#231b15' },
  { id: 61, hex: '#020202' },
  { id: 62, hex: '#706c66' },
  { id: 63, hex: '#9d7a50' },
];

const customizationStoreData = customization.getStoreData();

const Appearance = () => {
  return (
    <div>
      <div>
        Прическа
          <ul>
          {Array.from(Array(hairdsIds), (_, i) => {
            if (customizationStoreData.gender === 'male') {
              if (i === 23) return null;
              return (
              <li>
                <img src={require(`../../../../../assets/media/images/customization/hairs/male/${i}.png`)} alt="Hair" />
              </li>
              );
            }
            else if (customizationStoreData.gender === 'female') {
              if (i === 24) return null;
              return (
              <li>
                <img src={require(`../../../../../assets/media/images/customization/hairs/female/${i}.png`)} alt="Hair" />
              </li>
              );
            }
          })}
          </ul>
      </div>
        Цвет волос
        <div>
          <ul>
            {colors.map((color) => {
              return (
              <li>
                {color.id}
                <div style={{ backgroundColor: `${color.hex}` }}>-</div>
              </li>
              );
            })}
          </ul>
        </div>
    </div>
  );
};

export default Appearance;