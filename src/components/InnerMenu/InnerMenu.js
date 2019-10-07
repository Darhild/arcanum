import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import InnerMenuItem from './../InnerMenuItem';
import './InnerMenu.css';

const cnIcon = cn('InnerMenu');

export default class InnerMenu extends Component {
  updateData = (value) => {
    this.props.updateData(value);
  }

  render() {
    return (
      <div className={cnIcon(null, [...this.props.classes])}>
        <div className="InnerMenu-Wrapper">
          <div className="InnerMenu-Content">
            {
              this.props.data.map(item => <InnerMenuItem item={ item } key={ item.value } updateData={ this.updateData }/>)
            }            
          </div>
        </div>
      </div>
    )
  }  
}