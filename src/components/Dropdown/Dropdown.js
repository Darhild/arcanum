import React, { Component } from 'react';
import { cn } from '@bem-react/classname';
import InnerMenu from './components/InnerMenu';

const cnIcon = cn('InnerMenu');

export default class Dropdown extends Component {
  render() {
    return (
      <div class="Dropdown">
        <div class="Dropdown-Name Dropdown-Name_state_active">trunk</div>
        <InnerMenu />
        <div class="Inner-menu Dropdown-Inner-menu">
          <div class="Inner-menu-Wrapper">
            <div class="Inner-menu-Head"> 
              <div class="Inner-menu-Item">
                <div class="Inner-menu-Name">Trunk</div>
                <div class="Inner-menu-Updated">Last commit 4 s ago</div>
              </div>
            </div>
            <div class="Inner-menu-Content">
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-43865</div>
                <div class="Inner-menu-Updated">Last commit 1 min ago</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-94877</div>
                <div class="Inner-menu-Updated">Last commit yesterday, 14:50</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-87450</div>
                <div class="Inner-menu-Updated">Last commit on Jan 11, 12:01</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-27073</div>
                <div class="Inner-menu-Updated">Last commit on Dec 29, 2017</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-43865</div>
                <div class="Inner-menu-Updated">Last commit 1 min ago</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-94877</div>
                <div class="Inner-menu-Updated">Last commit yesterday, 14:50</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-87450</div>
                <div class="Inner-menu-Updated">Last commit on Jan 11, 12:01</div>
              </div>
              <div class="Inner-menu-Item"> 
                <div class="Inner-menu-Name">users/rudskoy/DEVTOOLS-27073</div>
                <div class="Inner-menu-Updated">Last commit on Dec 29, 2017</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }  
}
