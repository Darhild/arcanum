import React, { Component } from 'react';
import Icon from './../Icon';
import MainMenu from './../MainMenu';
import Search from './../Search';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div class="MainHeader">
        <div class="MainHeader-Wrapper">
          <Icon type="logo" classes={['MainHeader-Logo']} />
          <MainMenu />
          <Search classes={['MainHeader-Search']} />
        </div>
      </div>
    )
  }
}