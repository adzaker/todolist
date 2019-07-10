import React from "react";
class Pagination extends React.Component {
  render () {
    return (
      <div className="pagination">
        <ul className="pagination__list">
          {this.props.children}
        </ul>
      </div>
    )
  }
}

export default Pagination;