import React, { Component} from 'react';
import InnerMenu from './../InnerMenu';
import './MainMenu.css';

export default class MainMenu extends Component {
  constructor(props) {
    super(props);    
    this.state = { innerMenuIsOpen: false };
    this.toggleInnerMenu = this.toggleInnerMenu.bind(this);
  }

  toggleInnerMenu() {
    this.setState(state => ({
      innerMenuIsOpen: !state.innerMenuIsOpen
    }));
  }

  render() {
    if ( this.state.innerMenuIsOpen ) {
      
    }   

    return (
      <div class="MainMenu MainHeader-Menu"> 
        <div 
          className=
          { this.state.innerMenuIsOpen 
            ? 'MainMenu-Item MainMenu-Item_state_active'
            : 'MainMenu-Item' 
          }
          onClick={ this.toggleInnerMenu }
        >
          Repository Arc
        </div>
        { this.state.innerMenuIsOpen 
          ? <InnerMenu classes={['MainMenu-InnerMenu']} /> 
          : ''
        }                     
      </div>
    )
  }  
}