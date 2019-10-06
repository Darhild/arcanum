import React from 'react';
import { cn } from '@bem-react/classname';
import './IconPlus.css';
import Icon from './../Icon';

const cnIcon = cn('IconPlus');

const IconPlus = ({ classes, iconClasses, type, text }) => {
  return (
    <div className={cnIcon(null, classes)} >
      <div className="IconPlus-Icon"> 
      {
        type
        ? <Icon type={type} classes={iconClasses} />
        : null
      }          
      </div>
      <div className="IconPlus-Text FileContent-Name">{text}</div>
    </div>      
  )
}

export default IconPlus;