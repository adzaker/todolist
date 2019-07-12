import React from "react";
import { connect } from 'react-redux';

class CaseDetail extends React.Component {
  showIsDisable(isDisable) {
    if (!isDisable) {
      return <div style={{color: 'red'}}>В работе</div>;
    } else {
      return <div style={{color: 'green'}}>Выполнена</div>;
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
          <div className="detail__subHeader">
            {this.showIsDisable(record.isDisable)}
            <button onClick={this.props.switchDisable}>{!record.isDisable ? 'Завершить' : 'Вернуть в работу'}</button>
          </div>
          <textarea className="description" type="textarea" editable="true" value={record.description} onChange={this.props.changeDescription}/>
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
