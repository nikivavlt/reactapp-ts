import React from "react";
 
const TabContent = ({id, activeTab, children}) => {
 return (
   (activeTab === id ) && <div>{ children }</div>
 );
};

TabContent.defaultProps = {
    id: 'information',
}

export default TabContent;