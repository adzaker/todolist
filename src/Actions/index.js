import { types } from '../Constants'

export function addCase(value) {
  return {
    type: types.ADD_CASE,
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

export function loadFromServer(records) {
  return {
    type: types.LOAD_FROM_SERVER,
    records
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

export function changeDescription(value, id) {
  return {
    type: types.CHANGE_DESCRIPTION,
    value,
    id
  }
}

export function changeDetailsCount(value) {
  return {
    type: types.CHANGE_DETAILS_COUNT,
    value
  }
}

export function switchPreloader(url) {
  return {
    type: types.SWITCH_PRELOADER,
    url
  }
}