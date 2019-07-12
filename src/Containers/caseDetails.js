import React from "react";
import { connect } from 'react-redux';
import { changeDescription, switchDisable } from "../Actions";
import CaseDetail from "./caseDetail";
import { Link } from "react-router-dom";

class CaseDetails extends React.Component {
  changeDescription(e) {
    let {dispatch} = this.props;
    let id = this.props.records.currentRecord.id;
    dispatch(changeDescription(e.target.value, id));
  }

  switchDisable() {
    let id = this.props.records.currentRecord.id;
    let {dispatch} = this.props;
    dispatch(switchDisable(id));
  }

  render () {
    let {currentRecord} = this.props.records;
    console.log(currentRecord);
    return (
      <div className="detailsContainer">
        <Link to="/">Назад</Link>
        <CaseDetail switchDisable={this.switchDisable.bind(this)} record={currentRecord} changeDescription={this.changeDescription.bind(this)}/>
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
