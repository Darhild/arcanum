import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import InnerMenuItem from '../InnerMenuItem';
import './InnerMenu.css';
import { Repository } from '../../types';

const cnIcon = cn('InnerMenu');

interface InnerMenuProps {
  data: Array<Repository>,
  classes: Array<string>,  
  updateData: (value: Repository) => void
}

export default class InnerMenu extends Component<InnerMenuProps> {
  updateData = (value: Repository): void => {
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