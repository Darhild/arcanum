import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './IconPlus.css';
import Icon from './../Icon';

const cnIcon = cn('IconPlus');

export default class IconPlus extends Component {
  render() {
    return (
      <div className={cnIcon(null, this.props.classes)}>
        <div class="IconPlus-Icon"> 
          <Icon type={this.props.type} classes={this.props.iconClasses} />
        </div>
        <div class="IconPlus-Text FileContent-Name">{this.props.text}</div>
      </div>      
    )
  }
}