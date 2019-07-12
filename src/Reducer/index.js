import { defaultState, types, alertMessage } from "../Constants";
import { combineReducers } from 'redux';

export function todo(state = defaultState, action){
  let newState = {...state};
  switch (action.type) {
    case types.ADD_CASE:
      if (!action.value.length) {
        return newState;
      }
      newState.records.push({
        id: newState.counter,
        name: action.value,
        isDisable: false,
        description: '',
      });
      newState.counter = newState.counter + 1;
      newState.activePage = Math.ceil(newState.records.length / newState.maxItemsOnPage);
      newState.newDefaultRecords = [...newState.records];
      return newState;
    case types.SWITCH_DISABLE:
      let neededRecord = newState.records.filter((record) => {
        return record.id === action.value;
      });
      neededRecord[0].isDisable = !neededRecord[0].isDisable;
      return newState;
    case types.DELETE_ITEM:
      let recs = [];
      newState.newDefaultRecords.forEach((record) => {
        if (record.id !== action.value) {
          recs.push(record);
        }
      });
      newState.newDefaultRecords = [...recs];
      if (newState.activePage > Math.ceil(newState.records.length / newState.maxItemsOnPage) && newState.activePage > 1) {
        newState.activePage = Math.ceil(newState.records.length / newState.maxItemsOnPage);
      }
      if (newState.isFiltering) {
        recs = [];
        newState.records.forEach((record) => {
          if (record.id !== action.value) {
            recs.push(record);
          }
        });
        newState.records = [...recs];
      } else {
        newState.records = [...newState.newDefaultRecords];
      }
      return newState;
    case types.CHANGE_PAGE:
      if (action.value >= Math.ceil(newState.records.length / newState.maxItemsOnPage)) {
        newState.activePage = Math.ceil(newState.records.length / newState.maxItemsOnPage)
      } else {
        newState.activePage = action.value;
      }
      return newState;
    case types.LOAD_FROM_SERVER:
      if (!action.records) {
        alert(alertMessage);
        return newState;
      }
      const receivedRecords = [...action.records];
      let counter = newState.counter;
      let oldRecords = [];
      oldRecords = [...newState.records];
      let newRecords = receivedRecords.map((record) => {
        const r = {...record};
        r.id = counter;
        counter++;
        return r;
      });
      newState.records = [...oldRecords, ...newRecords];
      newState.newDefaultRecords = [...newState.records];
      newState.counter = counter;
      return newState;
    case types.CLEAR_TABLE:
      newState.records = [];
      newState.activePage = 1;
      newState.counter = 1;
      newState.newDefaultRecords = [];
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
      newState.activePage = 1;
      return newState;
    case types.SWITCH_PRELOADER:
      newState.showPreloader = !newState.showPreloader;
      return newState;
    case types.FILTER_LIST:
      if (!action.value.length) {
        newState.activePage = 1;
        newState.isFiltering = false;
        newState.records = [...newState.newDefaultRecords];
        return newState;
      }
      newState.isFiltering = true;
      const filteredRecords = newState.newDefaultRecords.filter((record) => {
        return record.name.includes(action.value)
      });
      newState.activePage = 1;
      newState.records = [...filteredRecords];
      return newState;
    case types.CHANGE_SORTING_TABLE:
      const sorting = newState.sortingTable;
      if (action.id.includes(newState.sortingTable.colNumber)) {
        sorting.directionUp = !sorting.directionUp;
      } else {
        sorting.colNumber = action.id.replace('sortingTable-','') - 0;
      }
      sorting.directionUp = !action.className.includes('-up');
      newState.sortingTable = {...sorting};
      let param = sorting.colNumber === 1 ? 'id' : sorting.colNumber === 2 ? 'name' : 'isDisable';
      newState.records.sort((a, b) => {
        return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
      });
      if (sorting.directionUp) {
        newState.records.sort((a, b) => {
          if (param === 'name') {
            return a[param].toLowerCase() < b[param].toLowerCase() ? 1 : a[param].toLowerCase() > b[param].toLowerCase() ? -1 : 0;
          } else {
            return a[param] < b[param] ? 1 : a[param] > b[param] ? -1 : 0;
          }
        });
      } else {
        newState.records.sort((a, b) => {
          if (param === 'name') {
            return a[param].toLowerCase() > b[param].toLowerCase() ? 1 : a[param].toLowerCase() < b[param].toLowerCase() ? -1 : 0;
          } else {
            return a[param] > b[param] ? 1 : a[param] < b[param] ? -1 : 0;
          }
        });
      }
      return newState;
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  todo,
});


