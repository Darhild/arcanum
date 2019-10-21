
import { StoreState } from './../types';
import { ActionTypes } from './../actions'

export const initialState: StoreState = {
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

export function reducer(state: StoreState = initialState, action: ActionTypes): StoreState {
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