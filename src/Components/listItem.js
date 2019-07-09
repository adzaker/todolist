import React from "react";
class ListItem extends React.Component {
  constructor() {
    super();
  };

  render () {
    let {record} = this.props;
    return (
      <tr className="caseList__item">
        <td className="width-24">{this.props.num}</td>
        <td className="width-full"><span className={record.isDisable ? 'disable' : ''}><a href='#' onClick={this.props.showDetails}>{ record.name }</a></span></td>
        <td className="width-90"><input type="checkbox" className="checkItem" checked={record.isDisable} onChange={this.props.switchThis}/></td>
        <td className="width-75"><button type="button" className="deleteButton" onClick={this.props.deleteThis}>Удалить</button></td>
      </tr>
    )
  }
}

export default ListItem;