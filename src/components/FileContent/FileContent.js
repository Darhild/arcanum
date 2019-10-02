import React, { Component } from 'react';
import './FileContent.css';
import IconPlus from './../IconPlus';
import Icon from './../Icon';
import FileContentRow from './../FileContentRow';

export default class FileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'ya.Make',
      type: 'file',
      size: '4347',
      content: [
        {
          "id": "1",
          "str": "#!/usr/bin/env python",
        },
        {
          "id": "2",
          "str": "import os",
        },
        {
          "id": "3",
          "str": "import sys",
        },
        {
          "id": "4",
          "str": "import platform",
        },
        {
          "id": "5",
          "str": "import json",
        },
        {
          "id": "6",
          "str": "",
        },
        {
          "id": "7",
          "str": "URLS = [ 'https://proxy.Sandbox.Yandex-team.Ru/453818264', 'http://storage-int.Mds.Yandex.Net/get-sandbox/110738/by_platform.Json.453815347' ]",
        },
        {
          "id": "8",
          "str": "MD5 = '7f5a85f9c28d35c3a76d8cea7af51106'",
        },
        {
          "id": "9",
          "str": "",
        },
        {
          "id": "10",
          "str": "RETRIES = 5",
        },
        {
          "id": "11",
          "str": "HASH_PREFIX = 10"
        }  
      ]
    };
  }

  render() {
    return (
      <div class="FileContent">
        <div class="FileContent-Head">
          <IconPlus type={this.state.type} iconClasses={['']} text={this.state.name} />
          <div class="FileContent-Size">({this.state.size} bytes)</div>
          <div class="FileContent-Download">
            <Icon type="download" classes={['']} />
          </div>
        </div>
        <div class="FileContent-Content">
          { this.state.content ? this.state.content.map(string => <FileContentRow key={string.id} id={string.id} content={string.str} />)  : null }
        </div>   
      </div>   
    )
  }
}