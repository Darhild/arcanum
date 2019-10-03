import React, { Component } from 'react';
import './ContentMenu.css';
import ContentMenuItem from './../ContentMenuItem';

export default class ContentMenu extends Component {
  render() {
    return (
      <div class="ContentMenu">
        <div class="ContentMenu-Wrapper">
          <ContentMenuItem data="files" />
          <ContentMenuItem data="branches" />          
        </div>
      </div>
    )
  }    
}