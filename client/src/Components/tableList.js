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
            <th className="width-68">
              <span className={`sortingTable ${filterCol === 1 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-1">
                №
                <FontAwesomeIcon icon={filterCol !== 1 ? faCaretDown : filterCol === 1 && filterDir === '-down' ? faCaretDown : faCaretUp} />
              </span>
            </th>
            <th className="width-full">
              <span className={`sortingTable ${filterCol === 2 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-2">
                Название
                 <FontAwesomeIcon icon={filterCol !== 2 ? faCaretDown : filterCol === 2 && filterDir === '-down' ? faCaretDown : faCaretUp} />
              </span>
            </th>
            <th className="width-90">
              <span className={`sortingTable ${filterCol === 3 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-3">
                Готовность
                 <FontAwesomeIcon icon={filterCol !== 3 ? faCaretDown : filterCol === 3 && filterDir === '-down' ? faCaretDown : faCaretUp} />
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