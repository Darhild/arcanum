import React, { Component } from 'react';
import './ContentMenu.css';

export default class ContentMenu extends Component {
  render() {
    return (
      <div class="ContentMenu">
        <div class="ContentMenu-Wrapper">
          <div class="ContentMenu-Item ContentMenu-Item_state_active">files</div>
          <div class="ContentMenu-Item">branches</div>
        </div>
      </div>
    )
  }    
}