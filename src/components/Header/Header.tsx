import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import MainMenu from '../MainMenu';
import Search from '../Search';
import './Header.css';

 const Header = () => {
  return (
    <div className="MainHeader">
      <div className="MainHeader-Wrapper">
        <Link to="/api/repos/">
          <Icon type="logo" classes={['MainHeader-Logo']} />
        </Link>
        <MainMenu />
        <Search classes={['MainHeader-Search']} />
      </div>
    </div>
  )
}

export default Header;