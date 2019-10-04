export const showContent = (data) => ({
  type: 'SHOW_CONTENT',
  isShown: data
})

export const fetchData = (url, dataType) => {
  return (dispatch) => {
    fetch(url)
    .then(res => res.json())
    .then(items => dispatch(itemsFetchDataSuccess(items, dataType)))
  }  
}

export const selectRepo = (name) => {
  return {
    type: 'SELECT_REPO',
    name
  }; 
}

function itemsFetchDataSuccess(items, dataType) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    dataType,
    items: items
  };
}

