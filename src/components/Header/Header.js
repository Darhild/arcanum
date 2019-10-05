import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './../Icon';
import MainMenu from './../MainMenu';
import Search from './../Search';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div class="MainHeader">
        <div class="MainHeader-Wrapper">
          <Link to="/api/repos">
            <Icon type="logo" classes={['MainHeader-Logo']} />
          </Link>
          <MainMenu />
          <Search classes={['MainHeader-Search']} />
        </div>
      </div>
    )
  }
}