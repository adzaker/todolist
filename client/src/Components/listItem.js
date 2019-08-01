import React from "react";
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ListItem extends React.Component {
  render() {
    let {record} = this.props;
    return (
      <tr className="caseList__item">
        <td className="width-68">{record.id}</td>
        <td className="width-full">
          <span className={record.isDisable ? 'disable' : ''}>
            <a href={`/items/${record.id}`} id={record.id} onClick={this.props.showDetails}>{record.name}</a>
          </span>
        </td>
        <td className="width-90">
          <input type="checkbox" className="checkItem" id={`checkbox${record.id}`} checked={record.isDisable} onChange={this.props.switchThis}/>
          <label htmlFor={`checkbox${record.id}`}>
            <FontAwesomeIcon icon={faCheck} />
          </label>
        </td>
        <td className="width-75">
          <button type="button" className="deleteButton " onClick={this.props.deleteThis}>Удалить</button>
        </td>
      </tr>
    )
  }
}

export default ListItem;