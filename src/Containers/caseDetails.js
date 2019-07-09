import React from "react";
import { connect } from 'react-redux';
import { showDetails, changeDescription } from "../Actions";
import CaseDetail from "./caseDetail";
import { Link } from "react-router-dom";

class CaseDetails extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    let {dispatch} = this.props;
    dispatch(showDetails(this.props.match.params.id));
  }

  componentWillUnmount() {
    let {dispatch} = this.props;
    dispatch(showDetails(false));
  }

  changeDescription(index, e) {
    let {dispatch} = this.props;
    dispatch(changeDescription(index, e.target.value));
  }

  render () {
    let {records} = this.props.records;
    return (
      <div className="detailsContainer">
        <Link to="/">Назад</Link>
        {records.map((record, index) => {
          return <CaseDetail record={record} key={index} changeDescription={this.changeDescription.bind(this, index)}/>
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    records: state.details
  }
}

export default connect(
  mapStateToProps
)(CaseDetails)
