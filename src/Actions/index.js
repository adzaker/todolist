import { types } from '../Constants'

export function addCase() {
  return {
    type: types.ADD_CASE
  }
}

export function setValue(value) {
  return {
    type: types.SET_VALUE,
    value
  }
}

export function switchDisable(value) {
  return {
    type: types.SWITCH_DISABLE,
    value
  }
}

export function deleteItem(value) {
  return {
    type: types.DELETE_ITEM,
    value
  }
}

export function changePage(value) {
  return {
    type: types.CHANGE_PAGE,
    value
  }
}

export function loadFromServer() {
  return {
    type: types.LOAD_FROM_SERVER,
  }
}

export function clearTable() {
  return {
    type: types.CLEAR_TABLE,
  }
}

export function showDetails(value) {
  return {
    type: types.SHOW_DETAILS,
    value
  }
}
export function changeDescription(index, value) {
  return {
    type: types.CHANGE_DESCRIPTION,
    value,
    index
  }
}