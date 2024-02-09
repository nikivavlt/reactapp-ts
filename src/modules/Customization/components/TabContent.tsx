import React from "react";

interface IProps {
  id: number, 
  activeTab: number,
  children: React.ReactNode,
}
 
const TabContent = ({id, activeTab, children}: IProps) => {
 return (
   (activeTab === id) ? <div>{ children }</div> : null
 );
};

TabContent.defaultProps = {
    id: 1,
};

export default TabContent;