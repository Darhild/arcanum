export const initialState = {
  mainMenu: [
    'Arc',
    'My repository',
    'Devtools-team repository'
  ],
  files: [],
  isShown: 'branches'
}

export function reducer(state = initialState, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  return state;
}