import React from "react";
class FilterForm extends React.Component {
  render () {
    return (
      <form>
        <input type="text" placeholder="Фильтр" id="filter" onKeyUp={this.props.filterList}/>
      </form>
    )
  }
}

export default FilterForm;