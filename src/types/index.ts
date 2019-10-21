export interface Repository {
  text: string,
  value: string
}

export interface StoreState {
  mainMenu: Array<Repository>,
  content: any,
  isShown: string,
  selectedRepo: Repository
}

