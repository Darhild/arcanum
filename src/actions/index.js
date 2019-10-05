export const showContent = (data) => ({
  type: 'SHOW_CONTENT',
  isShown: data
})

export const fetchData = (url) => {
  return (dispatch) => {
    fetch(url)
    .then(res => res.json())
    .then(content => dispatch(itemsFetchDataSuccess(content)))
  }  
}

export const selectRepo = (name) => {
  return {
    type: 'SELECT_REPO',
    name
  }; 
}

function itemsFetchDataSuccess(content) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    content
  }
}