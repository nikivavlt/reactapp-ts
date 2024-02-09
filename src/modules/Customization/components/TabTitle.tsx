import React from "react";
import '../Customization.scss';

interface IProps {
  id: number,
  title: string,
  activeTab: number,
  setActiveTab(id: number): void,
}

const TabTitle = ({ id, title, activeTab, setActiveTab }: IProps) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 

return (
   <li onClick={handleClick} className={activeTab === id ? "active" : "tab-title"}>
     { title }
   </li>
 );
};

export default TabTitle;