
export const initialState = {
  mainMenu: [
    'Arc',
    'My repository',
    'Devtools-team repository'
  ],
  files: [],
  isShown: 'files'
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_CONTENT':
      return { ...state, isShown: action.isShown }
    case 'ITEMS_FETCH_DATA_SUCCESS':
      const newProp = {};
      newProp[action.dataType] = action.items;
      return { ...state, files: action.items}
    default: 
      return state;
  }
}