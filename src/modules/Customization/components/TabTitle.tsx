import React from "react";

const TabTitle = ({ id, title, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
 //   <li onClick={handleClick} className={activeTab === id ? "active" : ""}>
return (
   <li onClick={handleClick}>
     { title }
   </li>
 );
};
export default TabTitle;