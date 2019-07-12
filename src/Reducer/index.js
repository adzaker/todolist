import { defaultState, types } from "../Constants";
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
      newState.records[action.value].isDisable = !newState.records[action.value].isDisable;
      newState.newDefaultRecords = [...newState.records];
      return newState;
    case types.DELETE_ITEM:
      newState.records.splice(action.value, 1);
      if (newState.activePage > Math.ceil(newState.records.length / newState.maxItemsOnPage) && newState.activePage > 1) {
        newState.activePage = Math.ceil(newState.records.length / newState.maxItemsOnPage);
      }
      newState.newDefaultRecords = [...newState.records];
      return newState;
    case types.CHANGE_PAGE:
      newState.activePage = action.value;
      return newState;
    case types.LOAD_FROM_SERVER:
      if (!action.records) {
        alert('Неверный формат данных.\n\n' +
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
          '}');
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
      console.log(newState.showPreloader);
      return newState;
    case types.FILTER_LIST:
      if (!action.value.length) {
        newState.activePage = 1;
        newState.records = [...newState.newDefaultRecords];
        return newState;
      }
      const filteredRecords = newState.newDefaultRecords.filter((record) => {
        return ~record.name.indexOf(action.value)
      });
      newState.activePage = 1;
      newState.records = [...filteredRecords];
      return newState;
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  todo,
});


