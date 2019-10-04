import React from 'react';

const InnerMenuItem = ({ item, updateData }) => {
  return <div class="InnerMenu-Item" onClick={() => updateData(item) }> { item.text } </div>
}

export default InnerMenuItem;