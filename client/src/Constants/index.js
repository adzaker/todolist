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
const FILTER_LIST = 'FILTER_LIST';
const CHANGE_SORTING_TABLE = 'CHANGE_SORTING_TABLE';
const CREATE_SECRET_STRING = 'CREATE_SECRET_STRING';
const LOAD_SAVED_FILE = 'LOAD_SAVED_FILE';

export const alertMessage = 'Неверный формат данных.\n\n' +
  'Нужен файл с расширением .json вида' +
  '{\n' +
  '  "records": [\n' +
  '    {\n' +
  '      "name": "Задача 1",\n' +
  '      "isDisable": false,\n' +
  '      "description": "Описание 1"\n' +
  '    },\n' +
  '    {\n' +
  '      "name": "Задача 2",\n' +
  '      "isDisable": false,\n' +
  '      "description": "Описание 2"\n' +
  '    },\n' +
  '    {\n' +
  '      "name": "Задача 3",\n' +
  '      "isDisable": true,\n' +
  '      "description": "Описание 3"\n' +
  '    }\n' +
  '  ]\n' +
  '}';

export const defaultState = {
  records: [],
  newDefaultRecords:[],
  activePage: document.location.hash.length ? document.location.hash.slice(1) - 0 : 1,
  maxItemsOnPage: 10,
  counter: 1,
  showPage: false,
  currentRecord: {},
  showPreloader: false,
  sortingTable: {
    colNumber: 1,
    directionUp: false,
  },
  isFiltering: false,
  secretStringValue: '',
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
  FILTER_LIST,
  CHANGE_SORTING_TABLE,
  CREATE_SECRET_STRING,
  LOAD_SAVED_FILE,
};
