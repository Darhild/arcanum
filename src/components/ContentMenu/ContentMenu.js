import React, { Component } from 'react';

export default class ContentMenu extends Component {
  render() {
    return (
      <div class="Content-menu">
        <div class="Content-menu-Wrapper">
          <div class="Content-menu-Item Content-menu-Item_state_active">files</div>
          <div class="Content-menu-Item">branches</div>
        </div>
      </div>
    )
  }    
}