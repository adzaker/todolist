import React from "react";
class NewPagination extends React.Component {
  render () {
    let {props} = this;
    return (
      <div className={`pagination ${props.isRecords ? '-active' : ''}`}>
        <ul className="pagination__list">
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export default NewPagination;