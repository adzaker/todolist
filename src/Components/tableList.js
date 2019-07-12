import React from "react";
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
              <span className={`sortingTable ${filterCol === 1 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-1">№</span>
            </th>
            <th className="width-full">
              <span className={`sortingTable ${filterCol === 2 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-2">Название</span>
            </th>
            <th className="width-90">
              <span className={`sortingTable ${filterCol === 3 ? filterDir : '-down'}`} onClick={this.props.changeSortingTable} id="sortingTable-3">Готовность</span>
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