import React from "react";
import {faCaretUp, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class TableList extends React.Component {
  render () {
    const filterCol = this.props.sortingTable.colNumber;
    const filterDir = this.props.sortingTable.directionUp ? '-up' : '-down';
    return (
      <div className={`caseList -recordsCount-${this.props.maxItemsOnPage}`}>
        <table className={`caseList__table`}>
          <thead>
          <tr>
            <th className="width-24">
              <span className={`sortingTable ${filterCol === 1 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-1">
                №
                {filterCol === 1 ? <FontAwesomeIcon className={filterCol === 1 ? filterDir : '-down'} icon={faCaretUp}/> : <FontAwesomeIcon icon={faCaretDown}/>}
              </span>
            </th>
            <th className="width-full">
              <span className={`sortingTable ${filterCol === 2 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-2">
                Название
                {filterCol === 2 ? <FontAwesomeIcon className={filterCol === 2 ? filterDir : '-down'} icon={faCaretUp}/> : <FontAwesomeIcon icon={faCaretDown}/>}
              </span>
            </th>
            <th className="width-90">
              <span className={`sortingTable ${filterCol === 3 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-3">
                Готовность
                {filterCol === 3 ? <FontAwesomeIcon className={filterCol === 3 ? filterDir : '-down'} icon={faCaretUp}/> : <FontAwesomeIcon icon={faCaretDown}/>}
              </span>
            </th>
            <th className="width-75">
              <span>Действия</span>
            </th>
          </tr>
          </thead>
          <tbody>
            {this.props.children}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TableList;