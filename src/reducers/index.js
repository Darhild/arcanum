const initialState = {
  mainMenu: [
    'Arc',
    'My repository',
    'Devtools-team repository'
  ],
  files: []
}

export default function renderMenus(state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  return state;
}