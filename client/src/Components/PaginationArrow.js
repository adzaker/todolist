import React from "react";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/fontawesome-free-solid';

class PaginationArrow extends React.Component {
  render () {
    let {props} = this;
    const content = props.content;
    return (
      <li className={`pagination__item`}>
        <Link to={`/#${props.i}`} onClick={props.changePage} style={{visibility: props.visibility}}>
          {content - 0 === ~~content ? props.content : <FontAwesomeIcon icon={['fas', props.content]} />}
        </Link>
      </li>
    )
  }
}

export default PaginationArrow;
