import React from 'react';
import './ContentMenu.css';
import ContentMenuItem from '../ContentMenuItem';

interface ContentMenuProps {
  items: Array<string>
}

const ContentMenu = ({ items }: ContentMenuProps) => {
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
