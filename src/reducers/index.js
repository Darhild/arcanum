
export const initialState = {
  mainMenu: [
    {
      text: 'Arc',
      value: 'arc'
    },
    {
      text: 'My repository',
      value: 'my-repository'
    },
    {
      text: 'Devtools-team repository',
      value: 'devtools-team-repository'
    }
  ],
  content: [],
  isShown: 'files',
  selectedRepo: {
    text: 'My repository',
    value: 'my-repository'
  }
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_CONTENT':
      return { ...state, isShown: action.isShown }

    case 'SELECT_REPO':
      return { ...state, selectedRepo: action.name }

    case 'ITEMS_FETCH_DATA_SUCCESS':
      return { ...state, content: action.content}

    default: 
      return state;
  }
}