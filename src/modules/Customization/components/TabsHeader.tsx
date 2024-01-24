import React from 'react'

const TabsHeader = ({ setActiveTab }) => {

  const handleClick = ((event) => {
    const tabId = event.target.id;

    setActiveTab(tabId);
  });

  return (
    <ul className="nav">
        <li onClick={(event) => handleClick(event)} id='information'>Информация</li>
        <li onClick={(event) => handleClick(event)} id='characteristics'>Характеристики</li>
        <li onClick={(event) => handleClick(event)} id='clothes'>Одежда</li>
    </ul>
  )
}

export default TabsHeader