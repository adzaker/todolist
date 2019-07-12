import React from "react";
import { Link } from 'react-router-dom'

class PaginationArrow extends React.Component {
  render () {
    let {props} = this;
    return (
      <li className={`pagination__item`}>
        <Link to={`/#${props.i}`} onClick={props.changePage} style={{visibility: props.visibility}}>{props.direction}</Link>
      </li>
    )
  }
}

export default PaginationArrow;