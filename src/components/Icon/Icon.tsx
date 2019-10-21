import React from 'react';
import { cn } from '@bem-react/classname';
import './Icon.css';
const icons = require('../../assets/icons-sprite.svg');

const cnIcon = cn('Icon');

interface IconProps {
  type: string,
  classes: Array<string> 
}

const Icon = ({ type, classes }: IconProps) => (
  <svg className={cnIcon({ [type]: true }, [...classes])}>
    <use xlinkHref={`${icons}#${type}`} />
  </svg>
);

export default Icon;