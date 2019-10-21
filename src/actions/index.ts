import { Repository } from "../types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const SHOW_CONTENT = 'SHOW_CONTENT';
type SHOW_CONTENT = typeof SHOW_CONTENT;

const SELECT_REPO = 'SELECT_REPO';
type SELECT_REPO = typeof SELECT_REPO;

const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';
type ITEMS_FETCH_DATA_SUCCESS = typeof ITEMS_FETCH_DATA_SUCCESS;

interface ShowContentAction {
  type: SHOW_CONTENT; 
  isShown: string 
}

interface SelectRepoAction {
  type: SELECT_REPO; 
  name: Repository 
}

interface itemsFetchDataSuccessAction {
  type: ITEMS_FETCH_DATA_SUCCESS;
  content: Array<object>
}

export type ActionTypes = ShowContentAction | SelectRepoAction | itemsFetchDataSuccessAction;

export const showContent = (data: string): ShowContentAction => ({
  type: SHOW_CONTENT,
  isShown: data
})

export const selectRepo = (name: Repository): SelectRepoAction => {
  return {
    type: SELECT_REPO,
    name
  }; 
}

function itemsFetchDataSuccess(content: Array<object>): itemsFetchDataSuccessAction {
  return {
    type: ITEMS_FETCH_DATA_SUCCESS,
    content
  }
}

export const fetchData = (url: string) => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    fetch(url)
    .then(res => res.json())
    .then(content => dispatch(itemsFetchDataSuccess(content)))
  }  
}