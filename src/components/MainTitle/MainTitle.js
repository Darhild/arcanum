import React, { Component } from 'react';
import './MainTitle.css';

export default class Title extends Component {
  render() {
    return (              
      <div class="MainTitle">
        <div class="MainTitle-Wrapper">
          <div class="MainTitle-Title">
            <div class="MainTitle-Name">arcadia </div>
            <div class="Dropdown-Name">trunk</div>
          </div>
          <div class="MainTitle-LastCommit">Last commit <span class="Link Link_color_accent">c4d248 </span>on <span class="Link Link_color_accent">20 Oct 2017, 12:24 </span>by <span class="Link Link_user">robot-search-releaser</span></div>
        </div>
      </div>
    )
  }   
}