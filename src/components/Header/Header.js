import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div class="Main-header">
        <div class="Main-header-Wrapper">
          <svg class="Logo Main-header-Logo">
            <use xlinkHref="images/icons-sprite.svg#logo"></use>
          </svg>
          <div class="Main-menu Main-header-Menu"> 
            <div class="Main-menu-Item">Repository Arc</div>
          </div>
          <div class="Search Main-header-Search"> </div>
        </div>
      </div>
    )
  }
}