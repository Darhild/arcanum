import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div class="Main-footer">
        <div class="Main-footer-Text">Trade secrets of Yandex LLC. 16, Lev Tolstoy Str., Moscow, Russia, 119021</div>
        <div class="Main-footer-Info">
          <div class="Main-footer-Version">UI: 0.1.15</div>
          <div class="Main-footer-Copyright">
            © 2007—2019 <span class="Link Link_color_accent">Yandex</span></div>
        </div>
      </div>
    )
  }    
}