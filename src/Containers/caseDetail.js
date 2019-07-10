import React from "react";
import { connect } from 'react-redux';

class CaseDetail extends React.Component {
  constructor() {
    super();
  }

  showIsDisable(isDisable) {
    if (!isDisable) {
      return <div style={{color: 'red'}}>Не выполнен</div>;
    } else {
      return <div style={{color: 'green'}}>Выполнен</div>;
    }
  }

  render () {
    let {record} = this.props;
     return (
      <div className="detail">
        <header>
          <h1>
            <span className="id">#{record.id}</span>
            {record.name}
          </h1>
        </header>
        <main>
          {this.showIsDisable(record.isDisable)}
          <textarea type="textarea" editable="true" value={record.description} onChange={this.props.changeDescription}/>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    records: state.detail
  }
}

export default connect(
  mapStateToProps
)(CaseDetail)
