import React from "react";
import '../Customization.scss';

interface IProps {
  id: number,
  title: string,
  activeTab: number,
  setActiveTab(id: number): void,
}

const tabIcons = [
  { title: 'Информация', image: require(`../../../assets/media/images/customization/icons/info.png`) },
  { title: 'Характеристики', image: require(`../../../assets/media/images/customization/icons/characteristics.png`)},
  { title: 'Одежда', image: require(`../../../assets/media/images/customization/icons/cloth.png`)},

  { title: 'Генетика', image: require(`../../../assets/media/images/customization/icons/DNA.png`) },
  { title: 'Внешний вид', image: require(`../../../assets/media/images/customization/icons/face.png`)},
  { title: 'Особенности', image: require(`../../../assets/media/images/customization/icons/features.png`)},

  { title: 'Головной убор', image: require(`../../../assets/media/images/customization/icons/hat.png`) },
  { title: 'Торс', image: require(`../../../assets/media/images/customization/icons/shirt.png`)},
  { title: 'Ноги', image: require(`../../../assets/media/images/customization/icons/jeans.png`)},
  { title: 'Обувь', image: require(`../../../assets/media/images/customization/icons/shoes.png`)},
];

const TabTitle = ({ id, title, activeTab, setActiveTab }: IProps) => {
 const handleClick = () => {
   setActiveTab(id);
 };
 

return (
   <li onClick={handleClick} className={activeTab === id ? "active" : "tab-title"}>
     { title }
     {activeTab === id
      ? <img className='tab-logo' src={tabIcons.find((element) => element.title === title)?.image} alt="Tab icon" />
      : null
     }
   </li>
 );
};

export default TabTitle;