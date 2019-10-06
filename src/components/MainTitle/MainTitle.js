import React, { Component } from 'react';
import './MainTitle.css';

export default class Title extends Component {
  render() {
    return (              
      <div className="MainTitle">
        <div className="MainTitle-Wrapper">
          <div className="MainTitle-Title">
            <div className="MainTitle-Name">arcadia </div>
            <div className="Dropdown-Name">trunk</div>
          </div>
          <div className="MainTitle-LastCommit">Last commit <span className="Link Link_color_accent">c4d248 </span>on <span className="Link Link_color_accent">20 Oct 2017, 12:24 </span>by <span className="Link Link_user">robot-search-releaser</span></div>
        </div>
      </div>
    )
  }   
}