import React from 'react';
import './ContentMenu.css';
import ContentMenuItem from './../ContentMenuItem';

const ContentMenu = ({ items }) => {
  return (
    <div className="ContentMenu">
      <div className="ContentMenu-Wrapper">
        {
          items.map(item => (
          <ContentMenuItem item={item} key={item} />
          ))
        }  
      </div>
    </div>
  )    
}

export default ContentMenu;
