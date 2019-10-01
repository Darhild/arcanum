import React from 'react';
import { cn } from '@bem-react/classname';
import './Icon.css';
import icons from './../../assets/icons-sprite.svg';

const cnIcon = cn('Icon');

const Icon = (props) => (
  <svg className={cnIcon({ [props.name]: true }, [...props.classes])}>
    <use xlinkHref={`${icons}#${props.name}`} />
  </svg>
);

export default Icon;