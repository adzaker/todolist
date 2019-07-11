const ADD_CASE = 'ADD_CASE';
const SET_VALUE = 'SET_VALUE';
const SWITCH_DISABLE = 'SWITCH_DISABLE';
const DELETE_ITEM = 'DELETE_ITEM';
const CHANGE_PAGE = 'CHANGE_PAGE';
const LOAD_FROM_SERVER = 'LOAD_FROM_SERVER';
const CLEAR_TABLE = 'CLEAR_TABLE';
const SHOW_DETAILS = 'SHOW_DETAILS';
const CHANGE_DESCRIPTION = 'CHANGE_DESCRIPTION';
const CHANGE_DETAILS_COUNT = 'CHANGE_DETAILS_COUNT';
const SWITCH_PRELOADER = 'SWITCH_PRELOADER';

export const defaultState = {
  records: [],
  activePage: document.location.hash.length ? document.location.hash.slice(1) - 0 : 1,
  maxItemsOnPage: 10,
  counter: 1,
  showPage: false,
  currentRecord: {},
  showPreloader: false,
};

export const types = {
  ADD_CASE,
  SET_VALUE,
  SWITCH_DISABLE,
  DELETE_ITEM,
  CHANGE_PAGE,
  LOAD_FROM_SERVER,
  CLEAR_TABLE,
  SHOW_DETAILS,
  CHANGE_DESCRIPTION,
  CHANGE_DETAILS_COUNT,
  SWITCH_PRELOADER,
};
