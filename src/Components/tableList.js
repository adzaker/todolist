import React from "react";
import ListItem from "./listItem";
class TableList extends React.Component {
  constructor() {
    super();
  };

  render () {
    return (
      <table className="caseList">
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
    )
  }
}

export default TableList;