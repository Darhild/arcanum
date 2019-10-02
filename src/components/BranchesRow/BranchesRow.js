import React, { Component } from 'react';
import IconPlus from './../IconPlus';

export default class BranchesRow extends Component {
  render() {
    const { branch } = this.props;

    return (
      <div class="ContentTable-Row">
        <IconPlus classes={['ContentTable-Col', 'ContentTable-Col_name']} type="branch" iconClasses={['']} text={branch.name ? branch.name : ''} />
        <div class="ContentTable-Col ContentTable-Col_last"> <span class="Link Link_color_accent">{branch.hash ? branch.hash : ''}</span></div>
      </div>
    )
  }
}