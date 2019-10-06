import React, { Component } from 'react';
import InnerMenu from './components/InnerMenu';

export default class Dropdown extends Component {
  render() {
    return (
      <div className="Dropdown">
        <div className="Dropdown-Name Dropdown-Name_state_active">trunk</div>
        <InnerMenu />
        <div className="Inner-menu Dropdown-Inner-menu">
          <div className="Inner-menu-Wrapper">
            <div className="Inner-menu-Head"> 
              <div className="Inner-menu-Item">
                <div className="Inner-menu-Name">Trunk</div>
                <div className="Inner-menu-Updated">Last commit 4 s ago</div>
              </div>
            </div>
            <div className="Inner-menu-Content">
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-43865</div>
                <div className="Inner-menu-Updated">Last commit 1 min ago</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-94877</div>
                <div className="Inner-menu-Updated">Last commit yesterday, 14:50</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-87450</div>
                <div className="Inner-menu-Updated">Last commit on Jan 11, 12:01</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-27073</div>
                <div className="Inner-menu-Updated">Last commit on Dec 29, 2017</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-43865</div>
                <div className="Inner-menu-Updated">Last commit 1 min ago</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-94877</div>
                <div className="Inner-menu-Updated">Last commit yesterday, 14:50</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-87450</div>
                <div className="Inner-menu-Updated">Last commit on Jan 11, 12:01</div>
              </div>
              <div className="Inner-menu-Item"> 
                <div className="Inner-menu-Name">users/rudskoy/DEVTOOLS-27073</div>
                <div className="Inner-menu-Updated">Last commit on Dec 29, 2017</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }  
}
