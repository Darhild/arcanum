import React, { Component } from 'react';
import './BranchesContent.css';
import IconPlus from './../IconPlus';
import Icon from './../Icon';
import BranchesRow from './../BranchesRow';

export default class BranchesContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      branches: [
        {
          "name": "users/a-aidyn00/my-feature-2",
          "hash": "6748ds893432438dsd823329d923482d",
        },
        {
          "name": "users/a-aidyn00/my-feature-3",
          "hash": "8748ds893432438dsd823329d923482d",
        }
      ]
    };
  }

  render() { 
    return (
      <div class="ContentTable">
        <div class="ContentTable-Row ContentTable-Head">
          <div class="ContentTable-Col">Name</div>
          <div class="ContentTable-Col ContentTable-Col_last">Commit Hash</div>
        </div>
        { this.state.branches 
          ? this.state.branches.map(branch => <BranchesRow branch={branch} />) 
          : null 
        }
      </div>
    )
  }
}