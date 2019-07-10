import { defaultState, types } from "../Constants";
import { combineReducers } from 'redux';
import { records } from "../json/records";

export function todo(state = defaultState, action){
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
      newState.activePage = Math.ceil(newState.records.length / newState.maxItemsOnPage);
      return newState;
    case types.SWITCH_DISABLE:
      newState.records[action.value].isDisable = !newState.records[action.value].isDisable;
      return newState;
    case types.DELETE_ITEM:
      newState.records.splice(action.value, 1);
      if (newState.activePage > Math.ceil(newState.records.length / newState.maxItemsOnPage) && newState.activePage > 1) {
        newState.activePage = Math.ceil(newState.records.length / newState.maxItemsOnPage);
      }
      return newState;
    case types.SET_VALUE:
      newState.currentWord = action.value;
      return newState;
    case types.CHANGE_PAGE:
      newState.activePage = action.value;
      return newState;
    case types.LOAD_FROM_SERVER:
      newState.records = [...records];
      newState.counter = newState.records.length + 1;
      return newState;
    case types.CLEAR_TABLE:
      newState.records = [];
      newState.activePage = 1;
      return newState;
    case types.SHOW_DETAILS:
      if (action.value) {
        let clickedRecord = newState.records.filter((record) => {
          return record.id - 0  === action.value - 0;
        });
        newState.currentRecord = clickedRecord[0];
      }
      return newState;
    case types.CHANGE_DESCRIPTION:
      let chosenRecord = newState.records.filter((record) => {
        return record.id - 0  === action.id - 0;
      });
      chosenRecord[0].description = action.value;
      return newState;
    case types.CHANGE_DETAILS_COUNT:
      newState.maxItemsOnPage = action.value;
      return newState;
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  todo,
});


