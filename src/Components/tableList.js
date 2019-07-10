import React from "react";
import ListItem from "./listItem";
class TableList extends React.Component {
  constructor() {
    super();
  };

  render () {
    console.log(this.props);
    return (
      <div className={`caseList -recordsCount-${this.props.maxItemsOnPage}`}>
        <table className={`caseList__table`}>
          <thead>
          <tr>
            <th className="width-24"><span>№</span></th>
            <th className="width-full"><span>Дело</span></th>
            <th className="width-90"><span>Готовность</span></th>
            <th className="width-75"><span>Действия</span></th>
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