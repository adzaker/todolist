import React from "react";
import { connect } from 'react-redux';
import { showDetails, changeDescription } from "../Actions";
import CaseDetail from "./caseDetail";
import { Link } from "react-router-dom";

class CaseDetails extends React.Component {
  constructor() {
    super();
  }

  changeDescription(e) {
    let {dispatch} = this.props;
    let id = this.props.records.currentRecord.id;
    dispatch(changeDescription(e.target.value, id));
  }

  render () {
    let {currentRecord} = this.props.records;
    console.log(currentRecord);
    return (
      <div className="detailsContainer">
        <Link to="/">Назад</Link>
        <CaseDetail record={currentRecord} changeDescription={this.changeDescription.bind(this)}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    records: state.todo
  }
}

export default connect(
  mapStateToProps
)(CaseDetails)
