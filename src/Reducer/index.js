import { defaultState, types } from "../Constants";
import { combineReducers } from 'redux';
import { records } from "../json/records";

let ds = defaultState;

export function todo(state = ds, action){
  let newState = {...state};
  switch (action.type) {
    case types.ADD_CASE:
      let newCase = newState.currentWord;
      if (newCase.length === 0) {
        return newState;
      }
      newState.records.push({
        id: newState.counter,
        name: newCase,
        isDisable: false,
        description: '',
      });
      newState.currentWord = '';
      newState.counter = newState.counter + 1;
      ds = newState;
      return newState;
    case types.SWITCH_DISABLE:
      newState.records[action.value].isDisable = !newState.records[action.value].isDisable;
      ds = newState;
      return newState;
    case types.DELETE_ITEM:
      newState.records.splice(action.value, 1);
      ds = newState;
      return newState;
    case types.SET_VALUE:
      newState.currentWord = action.value;
      ds = newState;
      return newState;
    case types.CHANGE_PAGE:
      newState.activePage = action.value;
      ds = newState;
      return newState;
    case types.LOAD_FROM_SERVER:
      newState.records = [...records];
      newState.counter = newState.records.length + 1;
      ds = newState;
      return newState;
    case types.CLEAR_TABLE:
      newState.records = [];
      ds = newState;
      return newState;
    default:
      ds = state;
      return state
  }
}

export function details(state = ds, action){
  console.log('ds');
  console.log(ds);
  let newState = {...state};
  switch (action.type) {
    case types.SHOW_DETAILS:
      console.log('action.value');
      console.log(action.value);
      console.log('newState');
      console.log(newState);
      console.log(newState.records.length);
      if (action.value) {
        let newRecords;
        if (!newState.records.length) {
          newRecords = ds.records.filter((record) => {
            return record.id - 0  === action.value - 0;
          });
        } else {
          newRecords = newState.records.filter((record) => {
            return record.id - 0  === action.value - 0;
          });
        }
        newState.records = [...newRecords];
      } else {
        newState = ds;
      }
      ds = newState;
      return newState;
    case types.CHANGE_DESCRIPTION:
      newState.records[0].description = action.value;
      ds = newState;
      return newState;
    default:
      ds = state;
      return state
  }
}

export const rootReducer = combineReducers({
  todo,
  details
});


