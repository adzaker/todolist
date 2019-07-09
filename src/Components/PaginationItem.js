import React from "react";
import { Link } from 'react-router-dom'

class PaginationItem extends React.Component {
  constructor() {
    super();
  };

  render () {
    let {props} = this;
    return (
      <li className={`pagination__item ${props.activePage === props.i ? '-active' : ''}`}>
        <Link to={`/#${props.i}`} onClick={props.changePage}>{props.i}</Link>
      </li>
    )
  }
}

export default PaginationItem;