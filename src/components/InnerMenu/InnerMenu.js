import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import './InnerMenu.css';

const cnIcon = cn('InnerMenu');

export default class InnerMenu extends Component {
  render() {
    return (
      <div className={cnIcon(null, [...this.props.classes])}>
        <div class="InnerMenu-Wrapper">
          <div class="InnerMenu-Content">
            <div class="InnerMenu-Item">Arc</div>
            <div class="InnerMenu-Item">My repository</div>
            <div class="InnerMenu-Item">Devtools-team repository</div>
          </div>
        </div>
      </div>
    )
  }  
}